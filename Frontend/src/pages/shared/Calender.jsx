import PageTitle from "@/UI/PageTitle";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
  viewMonthGrid,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-default/dist/index.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EventModel from "@/components/shared/EventCalenderModel";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { colors, colorsKeys } from "@/Util/colors";
import Cookies from "js-cookie";
import { createCalender, createEvent, getAllEvents } from "@/Util/Https/http";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import Loading from "../Loading";

dayjs.extend(customParseFormat);

const today = new Date();
const dateFormat = "YYYY-MM-DD HH:mm";

const getRandomCalendarId = () => {
  const keys = Object.keys(colorsKeys);
  return colorsKeys[keys[Math.floor(Math.random() * keys.length)]].colorName;
};

export default function Calender() {
  const {
    user: { token },
  } = useAuth();
  const [selectDate, setSelectDate] = useState(today);
  const hasLoadedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const eventsService = useMemo(() => createEventsServicePlugin(), []);
  const {
    mutate,
    data: newEvent,
    isPending,
  } = useMutation({
    mutationFn: createEvent,
    onSuccess: ({ data }) => {
      const event = {
        ...data.event,
        id: data.event._id,
        start: dayjs(data.event.startDate).format(dateFormat),
        end: dayjs(data.event.endDate).format(dateFormat),
        calendarId: getRandomCalendarId(),
        people: data.event.participation ? [data.event.participation] : [],
      };
      console.log("Event created successfully:", event);
      setEvents((prevEvents) => [...prevEvents, event]);
      eventsService.add(event);
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error creating event:", error);
      toast.error(error.message || "create event failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });
  const { data, isError, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: ({ signal }) => getAllEvents({ signal, token }),
    placeholderData: (prev) => prev,
    retry: 1,
  });
  const calender = useLoaderData();
  if (calender?.error) {
    toast.error(calendar?.message || "create calender failed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  }
  const AddEventMonth = useCallback(() => {
    setTimeout(() => {
      document.querySelectorAll(".sx__month-grid-day").forEach((cell) => {
        if (!cell.querySelector(".add-event-btn")) {
          const header = cell.querySelector(".sx__month-grid-day__header");
          const day = header.querySelector(
            ".sx__month-grid-day__header-day-name"
          );
          const dateAttr = cell.getAttribute("data-date");
          if (!dateAttr) return;
          const date = new Date(dateAttr);
          if (date) {
            const div = document.createElement("div");
            div.className = "w-full flex justify-between items-center";
            const btn = document.createElement("button");
            btn.textContent = "+";
            btn.className = "sx__month-grid-day__header-date";
            btn.onclick = () => {
              setOpen(true);
              setSelectDate(new Date(date));
            };
            const p = document.createElement("p");
            p.textContent = date.getDate();
            p.className = "sx__month-grid-day__header-date";
            if (dayjs(date).isSame(today, "day")) {
              p.className += " text-main-color font-bold";
              p.style = "font-size:20px;";
            }
            div.appendChild(p);
            div.appendChild(btn);
            header.innerHTML = "";
            if (day) header.appendChild(day);
            header.appendChild(div);
          }
        }
      });
    }, 100);
  }, []);
  const calendar = useCalendarApp({
    firstDayOfWeek: 0,
    defaultView: viewMonthGrid.name,
    weekOptions: { eventWidth: 95, eventOverlap: false },
    monthGridOptions: { nEventsPerDay: 3 },
    callbacks: {
      onRangeUpdate(range) {
        const startDate = new Date(range.start);
        const endDate = new Date(range.end);
        const differenceInDays = Math.round(
          (endDate - startDate) / (1000 * 60 * 60 * 24)
        );
        if (differenceInDays >= 30) AddEventMonth();
      },
      onClickDate(date) {
        console.log("onClickDate", date);
        setOpen(true);
        setSelectDate(new Date(date));
      },
      onClickDateTime(dateTime) {
        console.log("onClickDateTime", dateTime);
        setOpen(true);
      },
      onRender($app) {
        console.log("Calendar Rendered");
        AddEventMonth();
      },
      onEventUpdate(updatedEvent) {
        console.log("onEventUpdate", updatedEvent);
        eventsService.update(updatedEvent);
        setEvents(eventsService?.getAll() || []);
      },
    },
    calendars: colors,
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    // events,
    plugins: [
      eventsService,
      createDragAndDropPlugin(),
      createEventModalPlugin(),
    ],
  });

  useEffect(() => {
    if (hasLoadedRef.current || !data?.data) return;

    const transformEvent = (event) => ({
      id: event._id,
      title: event.title,
      start: dayjs(event.startDate).format(dateFormat),
      end: dayjs(event.endDate).format(dateFormat),
      description: event.description,
      people: event?.participation ? [event.participation] : [],
      calendarId: getRandomCalendarId(),
    });
    const events = data?.data?.map(transformEvent);

    if (events && events.length) {
      events.forEach((event) => eventsService.add(event));
      setEvents(events);
    } else {
      setEvents([]);
    }
    hasLoadedRef.current = true;
  }, [data]);

  const handleAddEvent = (newEvent) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("No authentication token found!");
      return;
    }

    mutate({
      data: {
        ...newEvent,
        startDate: newEvent.start,
        endDate: newEvent.end,
      },
      token,
    });

    console.log("Event Data:", newEvent);
  };
  return (
    <div className="bg-background-color">
      <PageTitle title="Calender" subtitle="Check your dates" />
      <div className="container max-w-screen-xl mx-auto px-4 w-full py-[30px] overflow-x-auto">
        {!isLoading && (
          <>
            <ScheduleXCalendar calendarApp={calendar} />
            {open && (
              <EventModel
                handleAddEvent={handleAddEvent}
                open={open}
                date={selectDate}
                setOpen={setOpen}
                isPending={isPending}
              />
            )}
          </>
        )}
        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export const calendarLoader = async () => {
  const token = Cookies.get("token");
  if (!token) {
    return { error: true, status: 401, message: "Unauthorized" };
  }

  try {
    const response = await createCalender({ token });
    return { data: response.data };
  } catch (error) {
    console.log(error);
    if (error?.alreadyExists) {
      console.warn("Calendar already exists, skipping creation.");
      return { status: 409, message: "Calendar already exists" };
    }
    console.error("Failed to create calendar", error);
    return {
      error: true,
      status: error.code || 500,
      message: error.message || "Failed to create calendar",
    };
  }
};

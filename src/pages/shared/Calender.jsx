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
import {
  createCalender,
  createEvent,
  deleteEvent,
  getAllEvents,
} from "@/Util/Https/http";
import { Link, useLoaderData } from "react-router-dom";
import { message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import Loading from "../Loading";
import { use } from "react";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "antd";

dayjs.extend(customParseFormat);

const today = new Date();
const dateFormat = "YYYY-MM-DD HH:mm";

const getRandomCalendarId = () => {
  const keys = Object.keys(colorsKeys);
  return colorsKeys[keys[Math.floor(Math.random() * keys.length)]].colorName;
};

const customComponents = {
  eventModal: ({ calendarEvent }) => {
    const { user } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const queryClient = useQueryClient();
    const token = Cookies.get("token");
    const handleDelete = async () => {
      if (window.confirm("Are you sure you want to delete this event?")) {
        try {
          setIsDeleting(true);
          await deleteEvent({ token, eventId: calendarEvent.id });
          // Refetch all events
          await queryClient.invalidateQueries(["events"]);
          message.success("Event deleted successfully");
          // Reload the page after successful deletion
          window.location.reload();
        } catch (error) {
          message.error(error.message || "Failed to delete event");
        } finally {
          setIsDeleting(false);
        }
      }
    };

    console.log(calendarEvent);;
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              {calendarEvent.title}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  calendarEvent.isMeeting
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {calendarEvent.isMeeting ? "Meeting" : "Event"}
              </span>
              <Button
                key="button"
                color="danger"
                variant="filled"
                loading={isDeleting}
                onClick={handleDelete}
                className="text-red-500 w-fit"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-red" />
                  Delete
                </div>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                {dayjs(calendarEvent.start).format("MMM D, YYYY h:mm A")} -{" "}
                {dayjs(calendarEvent.end).format("h:mm A")}
              </span>
            </div>

            <div className="flex items-start gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {calendarEvent.meetingId ? (
                <div className="text-gray-700">
                  {calendarEvent.description}{" "}
                  <Link
                    target="_blank"
                    to={`/meeting/waiting/${calendarEvent.meetingId}`}
                    className="text-[#0083ff] underline"
                  >
                    Link
                  </Link>
                </div>
              ) : (
                <p className="text-gray-700">{calendarEvent.description}</p>
              )}
            </div>

            {calendarEvent.people && calendarEvent.people.length > 0 && (
              <div className="flex items-start gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-gray-700">
                    Participants:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {calendarEvent?.meeting?.participants.map(({ user }) => (
                      <span
                        key={user.id}
                        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full flex items-center gap-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {user.email}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
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

  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: ({ data }) => {
      console.log(data);
      const event = {
        ...data.event,
        id: data.event._id,
        start: dayjs(data.event.startDate).format(dateFormat),
        end: dayjs(data.event.endDate).format(dateFormat),
        calendarId: getRandomCalendarId(),
        people: data.event.participation.map((person) => person.email) || [],
        meetingId: data.event.meetingId || "",
        isMeeting: !!data.event.meetingId,
      };
      console.log("Event created successfully:", event);
      if (eventsService) {
        eventsService.add(event);
      }
      setEvents((prevEvents) => [...prevEvents, event]);
      setOpen(false);
      message.success(
        `Create ${event.isMeeting ? "meeting" : "event"} Success!`
      );
    },
    onError: (error) => {
      console.error("Error creating event:", error);
      message.error(error.message || "Create event failed!");
    },
  });
  const { data, isError, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: ({ signal }) => getAllEvents({ signal, token }),
    placeholderData: (prev) => prev,
    retry: 1,
  });
  // console.log(data);
  const calender = useLoaderData();
  if (calender?.error) {
    message.error(calendar?.message || "create calender failed!");
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
    plugins: [eventsService, createEventModalPlugin()],
  });

  useEffect(() => {
    if (hasLoadedRef.current || !data?.data) return;

    const transformEvent = (event) => ({
      ...event,
      id: event._id,
      title: event.title,
      start: dayjs(event.startDate).format(dateFormat),
      end: dayjs(event.endDate).format(dateFormat),
      description: event.description,
      people: event?.meeting?.participants?.map((p) => p.email) || [],
      calendarId: getRandomCalendarId(),
      meetingId: event?.meeting?.meetingId,
    });
    // console.log(data?.data);
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
      message.error("No authentication token found!");
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
            <ScheduleXCalendar
              customComponents={customComponents}
              calendarApp={calendar}
            />
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

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
import { useCallback, useEffect, useMemo, useState } from "react";
import EventModel from "@/components/shared/EventCalenderModel";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { colors, colorsKeys } from "@/Util/colors";

dayjs.extend(customParseFormat);

const today = new Date();

const initEvents = [
  {
    id: "1",
    title: "Event 1",
    start: "2025-03-06",
    end: "2025-03-06",
    description: "Event 1 description",
    people: [],
    calendarId: "color1",
  },
  {
    id: "2",
    title: "Event 2",
    start: "2025-03-06 03:00",
    end: "2025-04-08 05:00",
    description: "Event 2 description",
    people: [],
    calendarId: "color2",
  },
  {
    id: "3",
    title: "Event 3",
    start: "2025-03-06 03:00",
    end: "2025-03-06 05:00",
    description: "Event 3 description",
    people: [],
  },
  {
    id: "4",
    title: "Event 4",
    start: "2025-03-06 03:00",
    end: "2025-03-06 05:00",
    description: "Event 4 description",
    people: [],
  },
  {
    id: "5",
    title: "Event 5",
    start: "2025-03-06 03:00",
    end: "2025-03-06 05:00",
    description: "Event 5 description",
    people: [],
  },
  {
    id: "6",
    title: "Event 6",
    start: "2025-03-06 03:00",
    end: "2025-03-06 05:00",
    description: "Event 6 description",
    people: [],
  },
];

const getRandomCalendarId = () => {
  const keys = Object.keys(colorsKeys);
  return colorsKeys[keys[Math.floor(Math.random() * keys.length)]].colorName;
};

export default function Calender() {
  const [selectDate, setSelectDate] = useState(today);
  const [open, setOpen] = useState(false);

  const [events, setEvents] = useState(
    initEvents.map((event) => ({
      ...event,
      calendarId: getRandomCalendarId(),
    }))
  );
  const eventsService = useMemo(() => createEventsServicePlugin(), []);

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
    events,
    plugins: [
      eventsService,
      createDragAndDropPlugin(),
      createEventModalPlugin(),
    ],
  });

  useEffect(() => {
    // get all events
    setEvents(eventsService?.getAll() || []);
  }, []);

  console.log(events);
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    eventsService.add(newEvent);
    console.log("Event Data:", newEvent);
    setOpen(false);
  };

  return (
    <>
      <PageTitle title="Calender" subtitle="Check your dates" />
      <div className="container max-w-screen-xl mx-auto p-4 w-full my-[30px] overflow-x-auto">
        <ScheduleXCalendar calendarApp={calendar} />
        {open && (
          <EventModel
            handleAddEvent={handleAddEvent}
            open={open}
            date={selectDate}
            setOpen={setOpen}
          />
        )}
      </div>
    </>
  );
}

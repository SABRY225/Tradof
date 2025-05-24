import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePickerWithRange from "@/UI/DatePickerWithRange";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Select, Space } from "antd";
import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD HH:mm";

export default function EventModel({
  date,
  handleAddEvent,
  open,
  setOpen,
  isPending,
  participation,
}) {
  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1); // Add 1 hour
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      date: {
        start: startDate,
        end: endDate,
      },
      description: "",
      people: participation,
      isMeeting: false,
    },
  });
  const formDate = watch();
  useEffect(() => {
    console.log(startDate, endDate, date);
    console.log("Start Date:", watch("date")?.start);
    console.log("End Date:", watch("date")?.end);
    setValue("date", { start: startDate, end: endDate });
  }, [date]); // ✅ Now updates when `date` changes

  const addEvent = () => {
    if (formDate.description.trim() === "") {
      setError("description", {
        type: "manual",
        message: "description is required",
      });
      return;
    }
    const newEvent = {
      id: crypto.randomUUID(),
      title: formDate.title,
      description: formDate.description,
      people: [formDate.people],
      start: dayjs(formDate.date.start).format(dateFormat), // ✅ Corrected
      end: dayjs(formDate.date.end).format(dateFormat), // ✅ Corrected
      isMeeting: formDate.isMeeting,
    };
    console.log(newEvent);
    handleAddEvent(newEvent);
  };

  return (
    <Modal
      open={open}
      centered={true}
      title="Add new event"
      onOk={addEvent}
      onCancel={() => setOpen(false)}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      footer={[
        <Button key="back" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isPending}
          onClick={handleSubmit(addEvent)}
        >
          Add event
        </Button>,
      ]}
    >
      <div className="text-sm text-muted-foreground">
        Add new event to your calender.
      </div>
      <form onSubmit={handleSubmit(addEvent)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className="col-span-3"
              placeholder="event title"
            />
            {errors.title && (
              <p className="text-red-500 text-[12px] col-start-2">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="date" className="text-right">
              Start and end date
            </Label>
            <DatePickerWithRange
              className="col-span-3"
              value={[
                watch("date.start") || startDate,
                watch("date.end") || endDate,
              ]} // ✅ Corrected
              onChange={(range) => {
                console.log(range);
                if (!range.start || !range.end) {
                  setError("date", {
                    type: "manual",
                    message: "Start and end date required",
                  });
                } else {
                  clearErrors("date");
                  setValue("date", { start: range.start, end: range.end });
                }
              }}
            />
            {errors.date && (
              <p className="text-red-500 text-[12px] col-start-2">
                {errors.date.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <TextArea
              value={watch("description")}
              onChange={(e) => {
                setValue("description", e.target.value);
                clearErrors("description");
              }}
              placeholder="event description"
              className="col-span-2"
              autoSize={{ minRows: 1, maxRows: 5 }}
            />
            <Select
              defaultValue={formDate.isMeeting ? "Meeting" : "Event"}
              style={{ width: 120 }}
              onChange={() => setValue("isMeeting", !formDate.isMeeting)}
              className="h-full max-h-[40px]"
              options={[
                { value: "event", label: "Event" },
                { value: "meeting", label: "Meeting" },
              ]}
            />
            {errors.description && (
              <p className="text-red-500 text-[12px] col-start-2 row-start-2">
                {errors.description.message}
              </p>
            )}
          </div>
          {formDate.isMeeting && (
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="email" className="text-right">
                Email for participator
              </Label>
              <Input
                id="email"
                {...register("people", {
                  required: formDate.isMeeting
                    ? "Participator email is required for meetings"
                    : false,
                })}
                className="col-span-3"
                placeholder="email"
              />
              {errors.people && (
                <p className="text-red-500 text-[12px] col-start-2 w-[300px]">
                  {errors.people.message}
                </p>
              )}
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
}

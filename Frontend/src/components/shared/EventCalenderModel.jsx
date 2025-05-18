import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonFelid from "@/UI/ButtonFelid";
import DatePickerWithRange from "@/UI/DatePickerWithRange";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FadeLoader } from "react-spinners";

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
      people: [participation],
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
    const newEvent = {
      id: crypto.randomUUID(),
      title: formDate.title,
      description: formDate.description,
      people: [formDate.people],
      start: dayjs(formDate.date.start).format(dateFormat), // ✅ Corrected
      end: dayjs(formDate.date.end).format(dateFormat), // ✅ Corrected
    };
    handleAddEvent(newEvent);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add new event</DialogTitle>
          <DialogDescription>Add new event to your calender.</DialogDescription>
        </DialogHeader>
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
              <Input
                id="description"
                type="text"
                {...register("description", {
                  required: "description is required",
                })}
                className="col-span-3"
                placeholder="event description"
              />
              {errors.description && (
                <p className="text-red-500 text-[12px] col-start-2">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="email" className="text-right">
                Email for participator
              </Label>
              <Input
                id="email"
                {...register("people", { required: "people is required" })}
                className="col-span-3"
                placeholder="email"
              />
              {errors.email && (
                <p className="text-red-500 text-[12px] col-start-2">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="flex items-center gap-3">
            {isPending && (
              <FadeLoader
                color="#000"
                cssOverride={{ width: "0px", height: "0px" }}
                height={3}
                width={3}
                loading
                margin={-11}
                radius={15}
                speedMultiplier={1}
              />
            )}{" "}
            <ButtonFelid
              type="submit"
              classes={`font-semibold text-[12px] px-[20px] py-[5px] bg-second-color ${
                isPending ? "opacity-[0.8] cursor-not-allowed" : ""
              }`}
              text="Add event"
              disabled={isPending}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

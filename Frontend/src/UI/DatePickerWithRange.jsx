import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD HH:mm:ss";
export default function DatePickerWithRange({
  className,
  value,
  onChange,
  ...props
}) {
  console.log(value[0]);
  return (
    <Space direction="vertical" size={12} className={className}>
      <RangePicker
        showTime
        className="w-full"
        defaultValue={[
          dayjs(dayjs(value[0]).format(dateFormat), dateFormat),
          dayjs(dayjs(value[1]).format(dateFormat), dateFormat),
        ]}
        format={dateFormat}
        onChange={(dates) => {
          console.log(dates ? new Date(dates[1].$d) : null);
          onChange({
            start: dates ? dates[0]?.$d : null,
            end: dates ? dates[1]?.$d : null,
          });
        }}
        {...props}
      />
    </Space>
  );
}

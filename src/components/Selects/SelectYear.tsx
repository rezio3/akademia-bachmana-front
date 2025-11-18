import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface SelectYearProps {
  value: number | null;
  onChange: (year: number) => void;
}

const SelectYear = ({ value, onChange }: SelectYearProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Rok"
        views={["year"]}
        value={value ? dayjs().year(value) : null}
        onChange={(newValue: Dayjs | null) => {
          if (newValue) onChange(newValue.year());
        }}
      />
    </LocalizationProvider>
  );
};

export default SelectYear;

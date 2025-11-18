import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { MonthType } from "../../common";

interface SelectMonthProps {
  value: number | null;
  onChange: (month: number) => void;
}
const SelectMonth = ({ value, onChange }: SelectMonthProps) => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Miesiąc</InputLabel>
      <Select
        label="Miesiąc*"
        labelId="miesiacLabelId"
        id="miesiac"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value as number)}
      >
        {months.map((month, index) => (
          <MenuItem key={month.label + index} value={month.value}>
            {month.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMonth;

export const months: MonthType[] = [
  { value: 1, label: "Styczeń" },
  { value: 2, label: "Luty" },
  { value: 3, label: "Marzec" },
  { value: 4, label: "Kwiecień" },
  { value: 5, label: "Maj" },
  { value: 6, label: "Czerwiec" },
  { value: 7, label: "Lipiec" },
  { value: 8, label: "Sierpień" },
  { value: 9, label: "Wrzesień" },
  { value: 10, label: "Październik" },
  { value: 11, label: "Listopad" },
  { value: 12, label: "Grudzień" },
];

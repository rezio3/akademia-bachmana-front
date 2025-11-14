import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { ControllerRenderProps, FieldError } from "react-hook-form";
import { PersonTypeLabels, PersonTypeMap } from "../../common";
type SelectPersonTypeProps = {
  field: ControllerRenderProps<any, any>;
  fieldState: { error?: FieldError | undefined };
};
const SelectPersonType: React.FC<SelectPersonTypeProps> = ({
  field,
  fieldState,
}) => {
  return (
    <FormControl error={!!fieldState.error} className="w-50" margin="dense">
      <InputLabel id="demo-simple-select-label">Typ*</InputLabel>
      <Select
        label="Typ*"
        labelId="personTypeLabelId"
        id="personType"
        {...field}
      >
        {Object.entries(PersonTypeMap).map(([key, value]) => (
          <MenuItem key={value} value={value}>
            {PersonTypeLabels[key as keyof typeof PersonTypeMap]}
          </MenuItem>
        ))}
      </Select>
      {fieldState.error && (
        <p
          style={{
            color: "#d32f2f",
            fontSize: "0.8rem",
            margin: "3px 14px 0",
          }}
        >
          {fieldState.error.message}
        </p>
      )}
    </FormControl>
  );
};

export default SelectPersonType;

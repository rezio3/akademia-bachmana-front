import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { ControllerRenderProps, FieldError } from "react-hook-form";
import { LocationTypeMap, LocationTypeLabels } from "../../common";

type SelectLocationProps = {
  field: ControllerRenderProps<any, any>;
  fieldState: { error?: FieldError | undefined };
  disabled?: boolean;
};

const SelectLocation: React.FC<SelectLocationProps> = ({
  field,
  fieldState,
  disabled,
}) => {
  return (
    <FormControl error={!!fieldState.error} className="w-50" margin="dense">
      <InputLabel id="locationTypeLabelId">Lokalizacja*</InputLabel>
      <Select
        label="Lokalizacja*"
        labelId="locationTypeLabelId"
        id="locationType"
        disabled={disabled || false}
        {...field}
      >
        {Object.entries(LocationTypeMap).map(([key, value]) => (
          <MenuItem key={value} value={value}>
            {LocationTypeLabels[key as keyof typeof LocationTypeMap]}
          </MenuItem>
        ))}
      </Select>
      {fieldState.error && (
        <p
          style={{ color: "#d32f2f", fontSize: "0.8rem", margin: "3px 14px 0" }}
        >
          {fieldState.error.message}
        </p>
      )}
    </FormControl>
  );
};

export default SelectLocation;

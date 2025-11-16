import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { ControllerRenderProps, FieldError } from "react-hook-form";
import { AudycjaStatusLabels, AudycjaStatusMap } from "../../common";

type SelectAudycjaStatusProps = {
  field: ControllerRenderProps<any, any>;
  fieldState: { error?: FieldError | undefined };
};

const SelectAudycjaStatus: React.FC<SelectAudycjaStatusProps> = ({
  field,
  fieldState,
}) => {
  return (
    <FormControl error={!!fieldState.error} className="w-50" margin="dense">
      <InputLabel id="statusLabelId">Status*</InputLabel>
      <Select label="Status*" labelId="statusLabelId" id="status" {...field}>
        {Object.entries(AudycjaStatusMap).map(([key, value]) => (
          <MenuItem key={value} value={value}>
            {AudycjaStatusLabels[key as keyof typeof AudycjaStatusMap]}
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

export default SelectAudycjaStatus;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "../elements/AddOrEditModal.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addAudycja,
  updateAudycja,
  type Audycja,
  type AudycjaForm,
} from "./audycje";
import { Controller, useForm } from "react-hook-form";
import { queryKeys } from "../../assets/queryKeys";
import { useEffect } from "react";
import SelectPlace from "../Selects/SelectPlace";
import {
  DatePicker,
  renderTimeViewClock,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import SelectPerson from "../Selects/SelectPerson";
import { useNotification } from "../../assets/NotificationProvider";
import SelectAudycjaStatus from "../Selects/SelectAudycjaStatus";
import CustomText from "../elements/CustomText";

type AddOrEditAudycjaModalProps = {
  handleClose: () => void;
  open: boolean;
  audycjaToEdit?: Audycja;
  defaultDate?: Date;
};

const AddOrEditAudycjaModal: React.FC<AddOrEditAudycjaModalProps> = ({
  handleClose,
  open,
  audycjaToEdit,
  defaultDate,
}) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { control, handleSubmit, reset } = useForm<AudycjaForm>();

  useEffect(() => {
    if (open) {
      if (audycjaToEdit) {
        reset({
          ...audycjaToEdit,
          date: dayjs(audycjaToEdit.startDate),
          startTime: dayjs(audycjaToEdit.startDate),
          endTime: dayjs(audycjaToEdit.endDate),
        });
      } else if (defaultDate) {
        reset({ date: defaultDate });
      } else {
        reset({});
      }
    }
  }, [open, audycjaToEdit, defaultDate, reset]);

  const mutationAdd = useMutation({
    mutationFn: addAudycja,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.audycjePage.audycjeListBase(),
      });
      showNotification("success", "Dodano audycję.");
      reset();
      handleClose();
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas dodawania audycji.");
      console.error("Błąd podczas dodawania audycji:", error);
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: updateAudycja,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.audycjePage.audycjeListBase(),
      });
      showNotification("success", "Edytowano audycję.");
      reset();
      handleClose();
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas edytowania audycji.");
      console.error("Błąd podczas edytowania zadania:", error);
    },
  });

  const onSubmit = (data: AudycjaForm) => {
    if (audycjaToEdit) {
      mutationUpdate.mutate({ ...data, _id: audycjaToEdit._id });
    } else {
      mutationAdd.mutate(data);
    }
  };
  const onSaveClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        {audycjaToEdit ? "Edytuj audycję" : "Dodaj audycję"}
      </DialogTitle>
      <DialogContent>
        <CustomText fontSize={12} fontWeight={500} className="mb-4">
          *Audycja zostanie dodana do województwa, w którym znajduje się wybrana
          placówka.
        </CustomText>
        <Controller
          name="place"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field, fieldState }) => (
            <SelectPlace field={field} fieldState={fieldState} />
          )}
        />
        <Controller
          name="date"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field, fieldState }) => (
            <DatePicker
              className="w-100 mb-3"
              format="DD/MM/YYYY"
              label="Data*"
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => field.onChange(newValue?.toDate())}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                  fullWidth: true,
                },
              }}
            />
          )}
        />
        <div className="add-or-edit-row mb-2">
          <Controller
            name="startTime"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field, fieldState }) => (
              <TimePicker
                ampm={false}
                label="Godzina od*"
                {...field}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) => field.onChange(newValue?.toDate())}
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
          <Controller
            name="endTime"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field, fieldState }) => (
              <TimePicker
                ampm={false}
                label="Godzina do*"
                {...field}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) => field.onChange(newValue?.toDate())}
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
        </div>
        <div className="add-or-edit-row">
          <Controller
            name="leader"
            control={control}
            render={({ field }) => (
              <SelectPerson
                field={field}
                isMusician={false}
                inputLabel="Prowadzący"
              />
            )}
          />
          <Controller
            name="musician"
            control={control}
            render={({ field }) => (
              <SelectPerson
                field={field}
                isMusician={true}
                inputLabel="Muzyk"
              />
            )}
          />
        </div>
        <div className="add-or-edit-row">
          <Controller
            name="status"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field, fieldState }) => (
              <SelectAudycjaStatus field={field} fieldState={fieldState} />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cena"
                className="w-50"
                margin="dense"
              />
            )}
          />
        </div>
        <div className="add-or-edit-row">
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Metoda płatności"
                className="w-50"
                margin="dense"
              />
            )}
          />
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Komentarz"
              multiline
              rows={3}
              fullWidth
              margin="dense"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Anuluj
        </Button>
        <Button
          variant="contained"
          onClick={onSaveClick}
          disabled={mutationAdd.isPending || mutationUpdate.isPending}
        >
          {audycjaToEdit ? "Zapisz" : "Dodaj"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditAudycjaModal;

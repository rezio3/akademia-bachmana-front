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
import { addPerson, updatePerson, type Person } from "./persons";
import { Controller, useForm } from "react-hook-form";
import { queryKeys } from "../../assets/queryKeys";
import { useEffect } from "react";
import SelectLocation from "../Selects/SelectLocation";
import SelectPersonType from "../Selects/SelectPersonType";
import { useNotification } from "../../assets/NotificationProvider";

type AddOrEditPersonModalProps = {
  handleClose: () => void;
  open: boolean;
  personToEdit?: Person;
};

const AddOrEditPersonModal: React.FC<AddOrEditPersonModalProps> = ({
  handleClose,
  open,
  personToEdit,
}) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { control, handleSubmit, reset } = useForm<Person>();

  useEffect(() => {
    if (open) {
      reset(personToEdit || {});
    }
  }, [open, personToEdit, reset]);

  const mutationAdd = useMutation({
    mutationFn: addPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.personsPage.personsList(1, ""),
      });
      showNotification("success", "Dodano osobę.");
      reset();
      handleClose();
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas dodawania osoby.");
      console.error("Błąd podczas dodawania osoby:", error);
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: updatePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.personsPage.personsList(1, ""),
      });
      showNotification("success", "Zaktualizowano osobę.");
      reset();
      handleClose();
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas edytowania osoby.");
      console.error("Błąd podczas edytowania osoby:", error);
    },
  });

  const onSubmit = (data: Person) => {
    if (personToEdit) {
      mutationUpdate.mutate({ ...data, _id: personToEdit._id });
    } else {
      mutationAdd.mutate(data);
    }
  };
  const onSaveClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{personToEdit ? "Edytuj osobę" : "Dodaj osobę"}</DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Imię i nazwisko*"
              fullWidth
              margin="dense"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <div className="add-or-edit-row">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Telefon"
                className="w-50"
                margin="dense"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                className="w-50"
                margin="dense"
              />
            )}
          />
        </div>

        <div className="add-or-edit-row">
          <Controller
            name="personType"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field, fieldState }) => (
              <SelectPersonType field={field} fieldState={fieldState} />
            )}
          />
          <Controller
            name="location"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field, fieldState }) => (
              <SelectLocation field={field} fieldState={fieldState} />
            )}
          />
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Opis"
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
          disabled={mutationAdd.isPending}
        >
          {personToEdit ? "Zapisz" : "Dodaj"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditPersonModal;

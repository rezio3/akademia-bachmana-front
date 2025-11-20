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
import { addPlace, updatePlace, type Place } from "./places";
import { Controller, useForm } from "react-hook-form";
import { queryKeys } from "../../assets/queryKeys";
import { useEffect } from "react";
import SelectLocation from "../Selects/SelectLocation";
import { useNotification } from "../../assets/NotificationProvider";

type AddOrEditPlaceModalProps = {
  handleClose: () => void;
  open: boolean;
  placeToEdit?: Place;
  onPlaceAdded?: (place: Place) => void; // Nowy prop
};

const AddOrEditPlaceModal: React.FC<AddOrEditPlaceModalProps> = ({
  handleClose,
  open,
  placeToEdit,
  onPlaceAdded,
}) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const { control, handleSubmit, reset } = useForm<Place>();

  useEffect(() => {
    if (open) {
      reset(placeToEdit || {});
    }
  }, [open, placeToEdit, reset]);

  const mutationAdd = useMutation({
    mutationFn: addPlace,
    onSuccess: (newPlace) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.placesPage.placesListBase(),
        exact: false,
      });
      showNotification("success", "Dodano placówkę.");

      // Jeśli jest callback, wywołaj go z nową placówką
      if (onPlaceAdded) {
        onPlaceAdded(newPlace);
      }

      reset();
      handleClose();
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas dodawania placówki.");
      console.error("Błąd podczas dodawania placówki:", error);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updatePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.placesPage.placesListBase(),
        exact: false,
      });
      showNotification("success", "Zaktualizowano placówkę.");
      reset();
      handleClose();
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas edytowania placówki.");
      console.error("Błąd podczas edytowania placówki:", error);
    },
  });

  const onSubmit = (data: Place) => {
    if (placeToEdit) {
      mutationUpdate.mutate({ ...data, _id: placeToEdit._id });
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
        {placeToEdit ? "Edytuj placówkę" : "Dodaj placówkę"}
      </DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Nazwa placówki*"
              fullWidth
              margin="dense"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <div className="add-or-edit-row">
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Adres"
                className="w-50"
                margin="dense"
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Telefon"
                className="w-50"
                margin="dense"
              />
            )}
          />
        </div>
        <div className="add-or-edit-row">
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

          <Controller
            name="invoiceEmail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email do faktur"
                className="w-50"
                margin="dense"
              />
            )}
          />
        </div>
        <div className="add-or-edit-row">
          <Controller
            name="contactPerson"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Osoba kontaktowa"
                className="w-50"
                margin="dense"
              />
            )}
          />
          <Controller
            name="locationTypeId"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field, fieldState }) => (
              <SelectLocation
                field={field}
                fieldState={fieldState}
                disabled={!!placeToEdit}
              />
            )}
          />
        </div>
        <div className="add-or-edit-row">
          <Controller
            name="nip"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="NIP"
                className="w-50"
                margin="dense"
              />
            )}
          />

          <Controller
            name="regon"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="REGON"
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
          {placeToEdit ? "Zapisz" : "Dodaj"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditPlaceModal;

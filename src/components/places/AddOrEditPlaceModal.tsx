import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./AddOrEditPlaceModal.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPlace, updatePlace, type Place } from "./places";
import { Controller, useForm } from "react-hook-form";
import { LocationTypeLabels, LocationTypeMap } from "../../common";
import { queryKeys } from "../../assets/queryKeys";
import { useEffect } from "react";

type AddOrEditPlaceModalProps = {
  handleClose: () => void;
  open: boolean;
  placeToEdit?: Place;
};

const AddOrEditPlaceModal: React.FC<AddOrEditPlaceModalProps> = ({
  handleClose,
  open,
  placeToEdit,
}) => {
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<Place>({
    defaultValues: placeToEdit || {
      name: "",
      phone: "",
      email: "",
      address: "",
      invoiceEmail: "",
      contactPerson: "",
      locationTypeId: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        placeToEdit || {
          name: "",
          phone: "",
          email: "",
          address: "",
          invoiceEmail: "",
          contactPerson: "",
          locationTypeId: "",
          description: "",
        }
      );
    }
  }, [open, placeToEdit, reset]);

  const mutationAdd = useMutation({
    mutationFn: addPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.placesPage.placesList(1, ""),
      });
      reset();
      handleClose();
    },
    onError: (error) => {
      console.error("Błąd podczas dodawania placówki:", error);
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: updatePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.placesPage.placesList(1, ""),
      });
      reset();
      handleClose();
    },
    onError: (error) => {
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
        {" "}
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
        <div className="add-place-row">
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
        <div className="add-place-row">
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
        <div className="add-place-row">
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
              <FormControl
                error={!!fieldState.error}
                className="w-50"
                margin="dense"
              >
                <InputLabel id="demo-simple-select-label">
                  Lokalizacja*
                </InputLabel>
                <Select
                  label="Lokalizacja*"
                  labelId="locationTypeLabelId"
                  id="locationType"
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
            )}
          />
        </div>
        <div className="add-place-row">
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

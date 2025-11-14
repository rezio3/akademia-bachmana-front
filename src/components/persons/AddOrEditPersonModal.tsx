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
import "./AddOrEditPersonModal.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPerson, updatePerson, type Person } from "./persons";
import { Controller, useForm } from "react-hook-form";
import {
  LocationTypeLabels,
  LocationTypeMap,
  PersonTypeLabels,
  PersonTypeMap,
} from "../../common";
import { queryKeys } from "../../assets/queryKeys";
import { useEffect } from "react";

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

  const { control, handleSubmit, reset } = useForm<Person>({
    defaultValues: personToEdit || {
      name: "",
      phone: "",
      email: "",
      personType: "",
      location: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        personToEdit || {
          name: "",
          phone: "",
          email: "",
          personType: "",
          location: "",
          description: "",
        }
      );
    }
  }, [open, personToEdit, reset]);

  const mutationAdd = useMutation({
    mutationFn: addPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.personsPage.personsList(1, ""),
      });
      reset();
      handleClose();
    },
    onError: (error) => {
      console.error("Błąd podczas dodawania osoby:", error);
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: updatePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.personsPage.personsList(1, ""),
      });
      reset();
      handleClose();
    },
    onError: (error) => {
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
      <DialogTitle>
        {" "}
        {personToEdit ? "Edytuj osobę" : "Dodaj osobę"}
      </DialogTitle>
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
        <div className="add-place-row">
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

        <div className="add-place-row">
          <Controller
            name="personType"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field, fieldState }) => (
              <FormControl
                error={!!fieldState.error}
                className="w-50"
                margin="dense"
              >
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
            )}
          />
          <Controller
            name="location"
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

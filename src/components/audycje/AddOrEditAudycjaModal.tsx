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
import { addAudycja, type Audycja } from "./audycje";
import { Controller, useForm } from "react-hook-form";
import { queryKeys } from "../../assets/queryKeys";
import { useEffect } from "react";

type AddOrEditAudycjaModalProps = {
  handleClose: () => void;
  open: boolean;
  audycjaToEdit?: Audycja;
};

const AddOrEditAudycjaModal: React.FC<AddOrEditAudycjaModalProps> = ({
  handleClose,
  open,
  audycjaToEdit,
}) => {
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<Audycja>();

  useEffect(() => {
    if (open) {
      reset(audycjaToEdit || {});
    }
  }, [open, audycjaToEdit, reset]);

  const mutationAdd = useMutation({
    mutationFn: addAudycja,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.audycjePage.audycjeList(),
      });
      reset();
      handleClose();
    },
    onError: (error) => {
      console.error("Błąd podczas dodawania audycji:", error);
    },
  });
  // const mutationUpdate = useMutation({
  //   mutationFn: updatePlace,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: queryKeys.placesPage.placesList(1, ""),
  //     });
  //     reset();
  //     handleClose();
  //   },
  //   onError: (error) => {
  //     console.error("Błąd podczas edytowania placówki:", error);
  //   },
  // });

  const onSubmit = (data: Audycja) => {
    // if (audycjaToEdit) {
    //   mutationUpdate.mutate({ ...data, _id: audycjaToEdit._id });
    // } else {
    mutationAdd.mutate(data);
    // }
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
        <Controller
          name="place"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Placówka*"
              fullWidth
              margin="dense"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <div className="add-or-edit-row">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Data od*"
                className="w-50"
                margin="dense"
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Data do*"
                className="w-50"
                margin="dense"
              />
            )}
          />
        </div>
        <div className="add-or-edit-row">
          <Controller
            name="leader"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Prowadzący"
                className="w-50"
                margin="dense"
              />
            )}
          />
          <Controller
            name="musician"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Muzyk"
                className="w-50"
                margin="dense"
              />
            )}
          />
        </div>
        <div className="add-or-edit-row">
          <Controller
            name="status"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Status*"
                className="w-50"
                margin="dense"
              />
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
          disabled={mutationAdd.isPending}
        >
          {audycjaToEdit ? "Zapisz" : "Dodaj"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditAudycjaModal;

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
import { useNotification } from "../../assets/NotificationProvider";
import CustomText from "../elements/CustomText";
import { formatTime, type ReminderForm } from "./reminder";

type ReminderModalProps = {
  handleClose: () => void;
  open: boolean;
  audycja: Audycja;
};

const ReminderModal: React.FC<ReminderModalProps> = ({
  handleClose,
  open,
  audycja,
}) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { control, /* handleSubmit, */ reset } = useForm<ReminderForm>();

  useEffect(() => {
    if (open) {
      reset({ email: audycja.place.email || "" });
    }
  }, [open, reset]);

  const mutationSend = useMutation({
    mutationFn: addAudycja,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.audycjePage.audycjeListBase(),
      });
      showNotification("success", "Wysłano przypomnienie.");
      reset();
      handleClose();
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas wysyłania przypomnienia.");
      console.error("Błąd podczas dodawania audycji:", error);
    },
  });

  //   const onSubmit = (data: ReminderForm) => {};
  const onSaveClick = () => {
    showNotification("success", "Wysłano przypomnienie."); // do usunięcia
    handleClose();
    // handleSubmit(onSubmit)();
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Wyślij przypomnienie</DialogTitle>
      <DialogContent>
        {audycja && (
          <CustomText fontSize={14} className="mb-3">
            Dzień dobry, uprzejmie przypominamy o jutrzejszych dwóch spotkaniach
            z Akademią Bachmana, w godzinach{" "}
            <b>
              {formatTime(audycja.startDate)} - {formatTime(audycja.endDate)}
            </b>
            .
            <br />
            <br />
            Kontakt do prowadzącego: <b>
              {audycja.leader?.name || "---"}{" "}
            </b>{" "}
            tel. <b>{audycja.leader?.phone || "---"}</b>
          </CustomText>
        )}

        <Controller
          name="email"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email*"
              fullWidth
              margin="dense"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
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
          disabled={mutationSend.isPending}
        >
          Wyślij
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderModal;

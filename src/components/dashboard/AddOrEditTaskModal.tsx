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

import { Controller, useForm } from "react-hook-form";
import { queryKeys } from "../../assets/queryKeys";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNotification } from "../../assets/NotificationProvider";
import { addTask, updateTask, type Task } from "./tasks";

type AddOrEditTaskModalProps = {
  handleClose: () => void;
  open: boolean;
  taskToEdit?: Task;
};

const AddOrEditTaskModal: React.FC<AddOrEditTaskModalProps> = ({
  handleClose,
  open,
  taskToEdit,
}) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { control, handleSubmit, reset } = useForm<Task>();

  useEffect(() => {
    if (taskToEdit) {
      reset({
        ...taskToEdit,
      });
    }
  }, [open, taskToEdit, reset]);

  const mutationAdd = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasksPage.tasksList(),
      });
      showNotification("success", "Dodano zadanie.");
      reset();
      handleClose();
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas dodawania zadania.");
      console.error("Błąd podczas dodawania zadania:", error);
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasksPage.tasksList(),
      });
      showNotification("success", "Edytowano zadanie.");
      reset();
      handleClose();
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas edytowania zadania.");
      console.error("Błąd podczas edytowania zadania:", error);
    },
  });

  const onSubmit = (data: Task) => {
    if (taskToEdit) {
      mutationUpdate.mutate({ ...data, _id: taskToEdit._id });
    } else {
      mutationAdd.mutate(data);
    }
  };
  const onSaveClick = () => {
    console.log("wbijam tu");
    handleSubmit(onSubmit)();
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        {taskToEdit ? "Edytuj zadanie" : "Dodaj zadanie"}
      </DialogTitle>
      <DialogContent>
        <Controller
          name="description"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Opis zadania*"
              className="mb-2"
              multiline
              rows={3}
              fullWidth
              margin="dense"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <DatePicker
              className="w-100 mb-3"
              format="DD/MM/YYYY"
              label="Data*"
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => field.onChange(newValue?.toDate())}
            />
            // <DatePicker
            //   className="w-100 mb-3"
            //   format="DD/MM/YYYY"
            //   label="Data*"
            //   {...field}
            //   value={field.value ? dayjs(field.value) : null}
            //   onChange={(newValue) => field.onChange(newValue?.toDate())}
            //   slotProps={{
            //     textField: {
            //       error: !!fieldState.error,
            //       helperText: fieldState.error?.message,
            //       fullWidth: true,
            //     },
            //   }}
            // />
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
          {taskToEdit ? "Zapisz" : "Dodaj"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditTaskModal;

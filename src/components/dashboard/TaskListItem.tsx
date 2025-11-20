// import "./TaskListItem.scss";
import CustomText from "../elements/CustomText";
import { Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ConfirmModal from "../elements/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../assets/queryKeys";
import { useNotification } from "../../assets/NotificationProvider";
import { deleteTask, toggleTaskCompletion, type Task } from "./tasks";
import AddOrEditTaskModal from "./AddOrEditTaskModal";
import DoneIcon from "@mui/icons-material/Done";
import dayjs from "dayjs";

type TaskListItemProps = {
  task: Task;
};

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const { showNotification } = useNotification();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: (_id: string) => deleteTask(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasksPage.tasksList(),
      });
      showNotification("success", "Usunięto zadanie.");
    },
    onError: (error) => {
      console.error("Błąd podczas usuwania zadania:", error);
      showNotification("error", "Błąd podczas usuwania zadania.");
    },
  });

  const toggleCompletionMutation = useMutation({
    mutationFn: (_id: string) => toggleTaskCompletion(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasksPage.tasksList(),
      });
      showNotification("success", "Zmieniono status zadania.");
    },
    onError: (error) => {
      console.error("Błąd podczas zmiany statusu:", error);
      showNotification("error", "Błąd podczas zmiany statusu zadania.");
    },
  });

  return (
    <>
      <div className="w-100 d-flex mb-2 align-items-center justify-content-between ">
        <CustomText fontSize={18} fontWeight={500}>
          Termin:{" "}
          {task.deadline ? dayjs(task.deadline).format("DD/MM/YYYY") : "brak"}{" "}
          {task.completed && "(Zrobione)"}
        </CustomText>
      </div>
      <Divider
        sx={{
          borderColor: "rgba(0, 0, 0, 0.5)",
          marginBottom: "10px",
        }}
      />
      <div className="task-list-item-table">
        <CustomText headerType="span" fontSize={14}>
          {task.description}
        </CustomText>
      </div>
      <div className="d-flex gap-2 mt-2">
        <Button
          variant="contained"
          size="small"
          color="info"
          onClick={() => setOpenEdit(true)}
        >
          Edytuj
          <EditIcon fontSize="small" className="ms-2" />
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={() => setOpenDeleteConfirmModal(true)}
        >
          Usuń
          <DeleteIcon fontSize="small" className="ms-1" />
        </Button>
        {!task.completed && (
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => toggleCompletionMutation.mutate(task._id!)}
          >
            Zrobione
            <DoneIcon fontSize="small" className="ms-1" />
          </Button>
        )}
      </div>
      <AddOrEditTaskModal
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        taskToEdit={task}
      />
      <ConfirmModal
        open={openDeleteConfirmModal}
        handleClose={() => setOpenDeleteConfirmModal(false)}
        onConfirm={() => {
          deleteTaskMutation.mutate(task._id!);
        }}
        description="Czy na pewno chcesz usunąć to zadanie?"
      />
    </>
  );
};

export default TaskListItem;

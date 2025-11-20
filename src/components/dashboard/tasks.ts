import { baseUrl } from "../../assets/baseUrl";
import type { Nil } from "../../common";

export const getTasksList = async (): Promise<TasksResponse> => {
  const res = await fetch(`${baseUrl}api/tasks`);
  if (!res.ok) throw new Error("Błąd podczas pobierania listy zadań.");
  return res.json();
};

export const addTask = async (task: Task) => {
  const res = await fetch(`${baseUrl}api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas dodawania zadania");
  }
  return res.json();
};

export const updateTask = async (task: Task & { _id: string }) => {
  if (!task._id) {
    throw new Error("Brak ID zadania do edycji");
  }

  const res = await fetch(`${baseUrl}api/tasks/${task._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas edycji zadania");
  }

  return res.json();
};

export const deleteTask = async (_id: string) => {
  const res = await fetch(`${baseUrl}api/tasks/${_id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas usuwania zadania");
  }

  return res.json();
};

export type Task = {
  _id: string;
  description: string;
  deadline?: string | Nil;
  completed: boolean;
};

export type TasksResponse = {
  tasks: Task[];
};

export const getTaskColor = (completed: boolean) => {
  return completed ? "#BBFFC9DD" : "#CDE8FFDD";
};

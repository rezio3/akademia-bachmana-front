import { useQuery } from "@tanstack/react-query";
import AddOrEditTaskModal from "../components/dashboard/AddOrEditTaskModal";
import Actions from "../components/elements/Actions";
import PageTitle from "../components/elements/PageTitle";
import {
  getTasksList,
  type TasksResponse,
} from "../components/dashboard/tasks";
import { queryKeys } from "../assets/queryKeys";
import Skeleton from "../components/elements/Skeleton";
import TasksList from "../components/dashboard/TasksList";

const DashboardPage = () => {
  const { data, isLoading, isError } = useQuery<TasksResponse>({
    queryKey: queryKeys.tasksPage.tasksList(),
    queryFn: () => getTasksList(),
  });

  const tasks = data?.tasks || [];
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <PageTitle>Zadania</PageTitle>
      <Actions
        label="Dodaj zadanie"
        modal={(props) => <AddOrEditTaskModal {...props} />}
      />
      {isLoading ? (
        <Skeleton count={5} height={70} className="mt-2" />
      ) : (
        <>
          {isError ? (
            <>
              <span className="mt-3 fs-4">
                Coś poszło nie tak podczas pobierania danych...
              </span>
            </>
          ) : (
            <TasksList tasks={tasks} />
          )}
        </>
      )}
    </>
  );
};

export default DashboardPage;

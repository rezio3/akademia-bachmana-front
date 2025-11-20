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
import { getCurrentAudycjeList } from "../components/dashboard/currentAudycje";
import CurrentAudycjeList from "../components/dashboard/CurrentAudycjeList";

const DashboardPage = () => {
  const {
    data: taskList,
    isLoading: isLoadingTaskList,
    isError: isErrorTaskList,
  } = useQuery<TasksResponse>({
    queryKey: queryKeys.tasksPage.tasksList(),
    queryFn: () => getTasksList(),
  });

  const {
    data: currentAudycjeList,
    isLoading: isLoadingCurrentAudycje,
    isError: isErrorCurrentAudycje,
  } = useQuery<any>({
    queryKey: queryKeys.dashboardPage.dashboardView(),
    queryFn: () => getCurrentAudycjeList(),
  });
  const currentAudycje = currentAudycjeList?.audycje || [];
  const tasks = taskList?.tasks || [];
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      {isLoadingCurrentAudycje ? (
        <Skeleton count={2} height={70} className="mt-2" />
      ) : (
        <>
          {isErrorCurrentAudycje ? (
            <>
              <span className="mt-3 fs-4">
                Coś poszło nie tak podczas pobierania listy audycji...
              </span>
            </>
          ) : (
            <CurrentAudycjeList currentAudycje={currentAudycje} />
          )}
        </>
      )}
      <PageTitle>Zadania</PageTitle>
      <Actions
        label="Dodaj zadanie"
        modal={(props) => <AddOrEditTaskModal {...props} />}
      />
      {isLoadingTaskList ? (
        <Skeleton count={5} height={70} className="mt-2" />
      ) : (
        <>
          {isErrorTaskList ? (
            <>
              <span className="mt-3 fs-4">
                Coś poszło nie tak podczas pobierania listy zadań...
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

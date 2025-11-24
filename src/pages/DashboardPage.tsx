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
// import { getCurrentAudycjeList } from "../components/dashboard/currentAudycje";
import CurrentAudycjeList from "../components/dashboard/CurrentAudycjeList";
import type { Audycja } from "../components/audycje/audycje";

const DashboardPage = () => {
  const {
    data: taskList,
    isLoading: isLoadingTaskList,
    isError: isErrorTaskList,
  } = useQuery<TasksResponse>({
    queryKey: queryKeys.tasksPage.tasksList(),
    queryFn: () => getTasksList(),
  });

  // const {
  //   data: currentAudycjeList,
  //   isLoading: isLoadingCurrentAudycje,
  //   isError: isErrorCurrentAudycje,
  // } = useQuery<any>({
  //   queryKey: queryKeys.dashboardPage.dashboardView(),
  //   queryFn: () => getCurrentAudycjeList(),
  // });
  // const currentAudycje = currentAudycjeList?.audycje || [];
  const tasks = taskList?.tasks || [];

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      {/* {isLoadingCurrentAudycje ? (
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
      )} */}
      {/* TO DELETE VVVVVVVVVVVVVVVVVVVVVVVVVVVVV */}
      <CurrentAudycjeList currentAudycje={currentAudycje} />

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

// TO DELETE VVVVVVVVVVVVVVVVVVVVVVVVV

export const currentAudycje: Audycja[] = [
  {
    _id: "6924510b789bf3cf72a9b326",
    place: {
      _id: "691308f92485d42067c0fe11",
      name: "Przedszkole misiaczki w Warszawie",
      phone: "999888777",
      email: "misiaczki@przedszkole.pl",
      address: "Warszawa, ul. Hubala 9",
      invoiceEmail: "misiaczki@faktury.pl",
      contactPerson: "Aneta Nowak",
      locationTypeId: 2,
      description: "Nie odbierają telefonów.",
      regon: "58991237353",
      nip: "49198838",
    },
    locationId: 2,
    //@ts-ignore
    startDate: "2025-11-24T12:00:00.000Z",
    //@ts-ignore
    endDate: "2025-11-24T14:00:00.000Z",
    leader: {
      _id: "6916335f605ee51c6920ddaa",
      name: "Anna Kowalska",
      personType: 1,
      phone: "817293785",
      email: "anna97kowalska@gmail.com",
      location: 2,
      description: "Woli maile zamiast telefonów",
    },
    musician: {
      _id: "69163397605ee51c6920ddac",
      name: "Krzysztof Kubiak",
      personType: 3,
      phone: "789789987",
      email: "krzys@onet.pl",
      location: 2,
      description: "Oboista",
    },
    status: 1,
    price: 600,
    paymentMethod: "Gotowka",
    description: "Platne przed rozpoczeciem audycji",
    isPaid: false,
  },
  {
    _id: "6924510b789bf3cf72a9b326",
    place: {
      _id: "691308f92485d42067c0fe11",
      name: "Stokrotki",
      phone: "999888777",
      email: "misiaczki@przedszkole.pl",
      address: "Warszawa, ul. Hubala 9",
      invoiceEmail: "misiaczki@faktury.pl",
      contactPerson: "Aneta Nowak",
      locationTypeId: 1,
      description: "Nie odbierają telefonów.",
      regon: "58991237353",
      nip: "49198838",
    },
    locationId: 2,
    //@ts-ignore
    startDate: "2025-11-24T10:15:00.000Z",
    //@ts-ignore
    endDate: "2025-11-24T11:25:00.000Z",
    leader: {
      _id: "6916335f605ee51c6920ddaa",
      name: "Anna Kowalska",
      personType: 1,
      phone: "817293785",
      email: "anna97kowalska@gmail.com",
      location: 2,
      description: "Woli maile zamiast telefonów",
    },
    musician: {
      _id: "69163397605ee51c6920ddac",
      name: "Krzysztof Kubiak",
      personType: 3,
      phone: "789789987",
      email: "krzys@onet.pl",
      location: 2,
      description: "Oboista",
    },
    status: 1,
    price: 600,
    paymentMethod: "Gotowka",
    description: "Platne przed rozpoczeciem audycji",
    isPaid: false,
  },
  {
    _id: "6924510b789bf3cf72a9b326",
    place: {
      _id: "691308f92485d42067c0fe11",
      name: "Motylkowo",
      phone: "999888777",
      email: "misiaczki@przedszkole.pl",
      address: "Warszawa, ul. Hubala 9",
      invoiceEmail: "misiaczki@faktury.pl",
      contactPerson: "Aneta Nowak",
      locationTypeId: 3,
      description: "Nie odbierają telefonów.",
      regon: "58991237353",
      nip: "49198838",
    },
    locationId: 4,
    //@ts-ignore
    startDate: "2025-11-24T08:55:00.000Z",
    //@ts-ignore
    endDate: "2025-11-24T09:28:00.000Z",
    leader: {
      _id: "6916335f605ee51c6920ddaa",
      name: "Anna Kowalska",
      personType: 1,
      phone: "817293785",
      email: "anna97kowalska@gmail.com",
      location: 2,
      description: "Woli maile zamiast telefonów",
    },
    musician: {
      _id: "69163397605ee51c6920ddac",
      name: "Krzysztof Kubiak",
      personType: 3,
      phone: "789789987",
      email: "krzys@onet.pl",
      location: 2,
      description: "Oboista",
    },
    status: 1,
    price: 600,
    paymentMethod: "Gotowka",
    description: "Platne przed rozpoczeciem audycji",
    isPaid: false,
  },
];

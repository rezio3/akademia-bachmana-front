import { useReducer, useState } from "react";
import PageTitle from "../components/elements/PageTitle";
import Actions from "../components/persons/Actions";
import PersonsList from "../components/persons/PersonsList";
import { filterReducer } from "../reducers/filterReducer";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../assets/queryKeys";
import { getPersonsList } from "../components/persons/persons";
import Skeleton from "../components/elements/Skeleton";
import SearchBar from "../components/elements/SearchBar";

const PersonsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, dispatch] = useReducer(filterReducer, "");
  const personsLimitInOnePage = 10;
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: queryKeys.placowkiPage.placowkiList(currentPage, filter),
    queryFn: () => getPersonsList(currentPage, personsLimitInOnePage, filter),
  });

  const persons = data?.persons || [];
  const totalPages = data?.totalPages || 1;
  return (
    <>
      <PageTitle>Prowadzący i muzycy</PageTitle>
      <Actions />
      <SearchBar filter={filter} dispatch={dispatch} />
      {isLoading ? (
        <Skeleton count={5} height={70} className="mt-2" />
      ) : (
        <>
          {isError ? (
            <>
              <span className="mt-3 fs-4">
                Coś poszło nie tak podczas pobierania danych...
              </span>
              {/* <Notification
                type="error"
                alert="Error loading tracks."
                open={notifyOpen}
                setOpen={setNotifyOpen}
              /> */}
            </>
          ) : (
            <PersonsList
              persons={persons}
              page={currentPage}
              onPageChange={(_e, value: number) => setCurrentPage(value)}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </>
  );
};

export default PersonsPage;

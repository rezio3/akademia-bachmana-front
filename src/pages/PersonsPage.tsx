import { useState } from "react";
import PageTitle from "../components/elements/PageTitle";
import Actions from "../components/elements/Actions";
import PersonsList from "../components/persons/PersonsList";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../assets/queryKeys";
import {
  getPersonsList,
  type PersonsResponse,
} from "../components/persons/persons";
import Skeleton from "../components/elements/Skeleton";
import SearchBar from "../components/elements/SearchBar";
import AddOrEditPersonModal from "../components/persons/AddOrEditPersonModal";

const PersonsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const personsLimitInOnePage = 10;
  const { data, isLoading, isError } = useQuery<PersonsResponse>({
    queryKey: queryKeys.personsPage.personsList(currentPage, debouncedFilter),
    queryFn: () =>
      getPersonsList(currentPage, personsLimitInOnePage, debouncedFilter),
  });

  const persons = data?.persons || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = (value: string) => {
    setDebouncedFilter(value);
    setCurrentPage(1);
  };
  return (
    <>
      <PageTitle>Prowadzący i muzycy</PageTitle>
      <Actions
        label="Dodaj osobę"
        modal={(props) => <AddOrEditPersonModal {...props} />}
      />
      <SearchBar onSearch={handleSearch} />
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

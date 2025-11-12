import { useReducer, useState } from "react";
import PlacowkiList from "../components/placowki/PlacowkiList";
import { queryKeys } from "../assets/queryKeys";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/elements/SearchBar";
import { getPlacowkiList } from "../components/placowki/placowki";
import { filterReducer } from "../reducers/filterReducer";
import PageTitle from "../components/elements/PageTitle";
import Skeleton from "../components/elements/Skeleton";
import Actions from "../components/placowki/Actions";

const PlacowkiPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, dispatch] = useReducer(filterReducer, "");
  const placowkiLimitInOnePage = 10;
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: queryKeys.placowkiPage.placowkiList(currentPage, filter),
    queryFn: () => getPlacowkiList(currentPage, placowkiLimitInOnePage, filter),
  });

  const placowki = data?.placowki || [];
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <PageTitle>Placówki</PageTitle>
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
            <PlacowkiList
              placowki={placowki}
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

export default PlacowkiPage;

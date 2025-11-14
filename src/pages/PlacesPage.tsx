import { useReducer, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { queryKeys } from "../assets/queryKeys";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/elements/SearchBar";
import { getPlacesList } from "../components/places/places";
import { filterReducer } from "../reducers/filterReducer";
import PageTitle from "../components/elements/PageTitle";
import Skeleton from "../components/elements/Skeleton";
import Actions from "../components/places/Actions";

const PlacesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, dispatch] = useReducer(filterReducer, "");
  const placesLimitInOnePage = 10;
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: queryKeys.placesPage.placesList(currentPage, filter),
    queryFn: () => getPlacesList(currentPage, placesLimitInOnePage, filter),
  });

  const places = data?.places || [];
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
            <PlacesList
              places={places}
              page={currentPage}
              onPageChange={(_e: any, value: number) => setCurrentPage(value)}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </>
  );
};

export default PlacesPage;

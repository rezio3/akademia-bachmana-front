import { useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { queryKeys } from "../assets/queryKeys";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/elements/SearchBar";
import { getPlacesList } from "../components/places/places";
import PageTitle from "../components/elements/PageTitle";
import Skeleton from "../components/elements/Skeleton";
import Actions from "../components/places/Actions";

const PlacesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const placesLimitInOnePage = 10;
  const [debouncedFilter, setDebouncedFilter] = useState("");

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: queryKeys.placesPage.placesList(currentPage, debouncedFilter),
    queryFn: () =>
      getPlacesList(currentPage, placesLimitInOnePage, debouncedFilter),
  });

  const places = data?.places || [];
  const totalPages = data?.totalPages || 1;
  const handleSearch = (value: string) => {
    setDebouncedFilter(value);
    setCurrentPage(1);
  };
  return (
    <>
      <PageTitle>Placówki</PageTitle>
      <Actions />
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <Skeleton count={5} height={70} className="mt-2" />
      ) : (
        <>
          {isError ? (
            <span className="mt-3 fs-4">
              Coś poszło nie tak podczas pobierania danych...
            </span>
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

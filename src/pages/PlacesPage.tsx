import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { queryKeys } from "../assets/queryKeys";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/elements/SearchBar";
import {
  getPlacesList,
  type PlacesResponse,
} from "../components/places/places";
import PageTitle from "../components/elements/PageTitle";
import Skeleton from "../components/elements/Skeleton";
// import Actions from "../components/places/Actions";
import AddOrEditPlaceModal from "../components/places/AddOrEditPlaceModal";
import Actions from "../components/elements/Actions";
import { useSearchParams } from "react-router-dom";

const PlacesPage = () => {
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const placesLimitInOnePage = 10;
  const [debouncedFilter, setDebouncedFilter] = useState(searchFromUrl);

  useEffect(() => {
    if (searchFromUrl) {
      setDebouncedFilter(searchFromUrl);
    }
  }, [searchFromUrl]);

  const { data, isLoading, isError } = useQuery<PlacesResponse>({
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
      <Actions
        label="Dodaj placówkę"
        modal={(props) => <AddOrEditPlaceModal {...props} />}
      />
      <SearchBar onSearch={handleSearch} initialValue={searchFromUrl} />
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

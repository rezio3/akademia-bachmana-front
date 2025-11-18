import { useState } from "react";
import LocationButtons from "../components/audycje/LocationButtons";
import PageTitle from "../components/elements/PageTitle";
import { LocationTypeMap, type LocationType } from "../common";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../assets/queryKeys";
import { getAudycjeList } from "../components/audycje/audycje";
import Actions from "../components/elements/Actions";
import AddOrEditAudycjaModal from "../components/audycje/AddOrEditAudycjaModal";
import SelectMonth from "../components/Selects/SelectMonth";
import SelectYear from "../components/Selects/SelectYear";
import AudycjeList from "../components/audycje/AudycjeList";
import Skeleton from "../components/elements/Skeleton";

const AudycjePage = () => {
  const [activeLocation, setActiveLocation] = useState<LocationType>(
    LocationTypeMap.Lubelskie
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(11);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: queryKeys.audycjePage.audycjeList(
      activeLocation,
      selectedMonth,
      selectedYear
    ),
    queryFn: () => getAudycjeList(activeLocation, selectedMonth, selectedYear),
  });

  const audycje = data?.audycje;

  return (
    <>
      <PageTitle>Audycje</PageTitle>
      <Actions
        label="Dodaj audycję"
        modal={(props) => <AddOrEditAudycjaModal {...props} />}
      />
      <LocationButtons
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
      />
      <div className="my-3 d-flex gap-3">
        <SelectMonth value={selectedMonth} onChange={setSelectedMonth} />
        <SelectYear value={selectedYear} onChange={setSelectedYear} />
      </div>
      {isLoading && !audycje ? (
        <Skeleton />
      ) : isError ? (
        <span>Wystąpił błąd podczas pobierania listy audycji.</span>
      ) : (
        <AudycjeList audycje={audycje} />
      )}
    </>
  );
};

export default AudycjePage;

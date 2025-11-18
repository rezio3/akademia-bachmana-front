import { useEffect, useState } from "react";
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
import CustomText from "../components/elements/CustomText";
import { useSearchParams } from "react-router-dom";

const AudycjePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialLocation = (): LocationType => {
    const locationParam = searchParams.get("location");
    return locationParam
      ? (Number(locationParam) as LocationType)
      : LocationTypeMap.Lubuskie;
  };

  const getInitialMonth = (): number => {
    const monthParam = searchParams.get("month");
    return monthParam ? Number(monthParam) : new Date().getMonth() + 1;
  };

  const getInitialYear = (): number => {
    const yearParam = searchParams.get("year");
    return yearParam ? Number(yearParam) : new Date().getFullYear();
  };

  const [activeLocation, setActiveLocation] = useState<LocationType>(
    getInitialLocation()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(getInitialMonth());
  const [selectedYear, setSelectedYear] = useState<number>(getInitialYear());

  useEffect(() => {
    setSearchParams({
      location: activeLocation.toString(),
      month: selectedMonth.toString(),
      year: selectedYear.toString(),
    });
  }, [activeLocation, selectedMonth, selectedYear, setSearchParams]);

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: queryKeys.audycjePage.audycjeList(
      activeLocation,
      selectedMonth,
      selectedYear
    ),
    queryFn: () => getAudycjeList(activeLocation, selectedMonth, selectedYear),
  });

  const audycje = data?.audycje;
  const count = audycje?.length;

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
      <div className="my-3 d-flex align-items-end gap-3 ">
        <SelectMonth value={selectedMonth} onChange={setSelectedMonth} />
        <SelectYear value={selectedYear} onChange={setSelectedYear} />
        {data && (
          <CustomText fontSize={14}>
            {audycje.length} {audycjeCountLabel(count)}
          </CustomText>
        )}
      </div>
      {isLoading && !audycje ? (
        <Skeleton />
      ) : isError ? (
        <span>Wystąpił błąd podczas pobierania listy audycji.</span>
      ) : (
        <AudycjeList
          audycje={audycje}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      )}
    </>
  );
};

export default AudycjePage;

const audycjeCountLabel = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (count === 1) {
    return "audycja";
  }
  // Exceptions: 12, 13, 14 (i 112, 113, 114, 212, 213, 214 etc.)
  if (lastTwoDigits === 12 || lastTwoDigits === 13 || lastTwoDigits === 14) {
    return "audycji";
  }

  // Last digit is 2, 3 or 4
  if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
    return "audycje";
  }

  // Others (0, 1, 5, 6, 7, 8, 9)
  return "audycji";
};

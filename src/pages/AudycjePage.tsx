import { useState } from "react";
import LocationButtons from "../components/audycje/LocationButtons";
import PageTitle from "../components/elements/PageTitle";
import type { LocationType } from "../common";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../assets/queryKeys";
import { getAudycjeList } from "../components/audycje/audycje";
import Actions from "../components/elements/Actions";
import AddOrEditAudycjaModal from "../components/audycje/AddOrEditAudycjaModal";

const AudycjePage = () => {
  const [activeLocation, setActiveLocation] = useState<LocationType | null>(1);
  const { data /* isLoading, isError */ } = useQuery<any>({
    queryKey: queryKeys.audycjePage.audycjeList(),
    queryFn: () => getAudycjeList(),
  });
  console.log(data);
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
    </>
  );
};

export default AudycjePage;

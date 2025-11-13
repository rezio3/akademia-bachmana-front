import { useState } from "react";
import LocationButtons from "../components/audycje/LocationButtons";
import PageTitle from "../components/elements/PageTitle";
import type { LocationType } from "../common";

const AudycjePage = () => {
  const [activeLocation, setActiveLocation] = useState<LocationType | null>(1);
  return (
    <>
      <PageTitle>Audycje</PageTitle>
      <LocationButtons
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
      />
    </>
  );
};

export default AudycjePage;

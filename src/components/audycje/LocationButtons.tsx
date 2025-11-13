import { CardContent, CardActionArea } from "@mui/material";
import HeaderText from "../elements/HeaderText";
import {
  displayNameByLocation,
  Location,
  type LocationEnum,
} from "./locations";
import type React from "react";

type LocationButtonsProps = {
  activeLocation: LocationEnum | null;
  setActiveLocation: (location: LocationEnum) => void;
};

const LocationButtons: React.FC<LocationButtonsProps> = ({
  activeLocation,
  setActiveLocation,
}) => {
  const CardWrapper: React.ElementType = CardActionArea;
  const locationList: LocationEnum[] = Object.values(Location);

  return (
    <div className="d-flex gap-2">
      {locationList.map((locationId, index) => {
        const isActive = activeLocation === locationId;

        return (
          <CardWrapper
            className="d-flex  rounded-2"
            onClick={() => setActiveLocation(locationId)}
            key={locationId + index}
            style={{
              width: 300,
              cursor: "pointer",
              backgroundColor: isActive ? "#a7f3d0" : "white",
              transition: "background-color 0.3s",
            }}
          >
            <CardContent className="d-flex ">
              <HeaderText fontSize={20}>
                {displayNameByLocation[locationId]}
              </HeaderText>
            </CardContent>
          </CardWrapper>
        );
      })}
    </div>
  );
};

export default LocationButtons;

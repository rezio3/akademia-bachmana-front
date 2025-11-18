import type { LocationType } from "../common";

export const queryKeys = {
  placesPage: {
    placesListBase: () => ["places", "list"],
    placesList: (page?: number, filter?: string) => [
      "places",
      "list",
      page || "",
      filter || "",
    ],
  },
  personsPage: {
    personsListBase: () => ["places", "list"],
    personsList: (page?: number, filter?: string) => [
      "persons",
      "list",
      page || "",
      filter || "",
    ],
  },
  audycjePage: {
    audycjeListBase: () => ["audycje", "list"],
    audycjeList: (
      activeLocation: LocationType,
      selectedMonth: number,
      selectedYear: number
    ) => ["audycje", "list", activeLocation, selectedMonth, selectedYear],
  },
  leadersDropdown: {
    leadersDropdownList: (filter?: string) => ["leaders", "list", filter || ""],
  },
  musiciansDropdown: {
    musiciansDropdownList: (filter?: string) => [
      "musicians",
      "list",
      filter || "",
    ],
  },
};

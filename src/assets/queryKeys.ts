export const queryKeys = {
  placesPage: {
    placesListBase: () => ["places", "list"],
    placesList: (page?: number, filter?: string) => [
      "places",
      "list",
      page,
      filter,
    ],
  },
  personsPage: {
    personsList: (page?: number, filter?: string) => [
      "persons",
      "list",
      page,
      filter,
    ],
  },
  audycjePage: {
    audycjeList: () => ["audycje", "list"],
  },
  leadersDropdown: {
    leadersDropdownList: (filter?: string) => ["leaders", "list", filter],
  },
  musiciansDropdown: {
    musiciansDropdownList: (filter?: string) => ["musicians", "list", filter],
  },
};

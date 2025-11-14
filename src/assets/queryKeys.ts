export const queryKeys = {
  placesPage: {
    placesList: (page: number, filter: string) => [
      "places",
      "list",
      page,
      filter,
    ],
  },
  personsPage: {
    personsList: (page: number, filter: string) => [
      "persons",
      "list",
      page,
      filter,
    ],
  },
  audycjePage: {
    audycjeList: () => ["audycje", "list"],
  },
};

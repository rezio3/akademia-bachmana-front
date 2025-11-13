export const queryKeys = {
  placowkiPage: {
    placowkiList: (page: number, filter: string) => [
      "placowki",
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
};

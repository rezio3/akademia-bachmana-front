export const queryKeys = {
  placowkiPage: {
    placowkiList: (page: number, filter: string) => [
      "music",
      "list",
      page,
      filter,
    ],
  },
};

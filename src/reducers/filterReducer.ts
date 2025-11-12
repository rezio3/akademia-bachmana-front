export type FilterAction =
  | { type: "SET_SEARCH_FILTER"; payload: string }
  | { type: "CLEAR_FILTER" };

export const filterReducer = (state: string, action: FilterAction): string => {
  switch (action.type) {
    case "SET_SEARCH_FILTER":
      return action.payload;
    case "CLEAR_FILTER":
      return "";
    default:
      return state;
  }
};

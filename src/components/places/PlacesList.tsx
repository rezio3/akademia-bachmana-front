import { Pagination, Stack } from "@mui/material";
import PlaceListItem from "./PlaceListItem";
import ListItemWrapper from "../elements/ListItemWrapper";
import type { Place } from "./places";
type PlacesListProps = {
  places: Place[];
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages: number;
};
const PlacesList: React.FC<PlacesListProps> = ({
  places,
  page,
  onPageChange,
  totalPages,
}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <ul className="list-unstyled p-0 w-100">
        {places.map((place, index) => (
          <ListItemWrapper key={place.name + index}>
            <PlaceListItem place={place} />
          </ListItemWrapper>
        ))}
      </ul>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          size="large"
          page={page}
          onChange={onPageChange}
        />
      </Stack>
    </div>
  );
};

export default PlacesList;

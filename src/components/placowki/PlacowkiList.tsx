import { Pagination, Stack } from "@mui/material";
import type { Placowka } from "./placowki";
import PlacowkaListItem from "./PlacowkaListItem";
type PlacowkiListProps = {
  placowki: Placowka[];
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages: number;
};
const PlacowkiList: React.FC<PlacowkiListProps> = ({
  placowki,
  page,
  onPageChange,
  totalPages,
}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <ul className="list-unstyled p-0 w-100">
        {placowki.map((placowka, index) => (
          <PlacowkaListItem placowka={placowka} key={placowka.name + index} />
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

export default PlacowkiList;

import { Pagination, Stack } from "@mui/material";
import ListItemWrapper from "../elements/ListItemWrapper";
import type { Person } from "./persons";
import PersonListItem from "./PersonListItem";
type PersonListProps = {
  persons: Person[];
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages: number;
};
const PersonsList: React.FC<PersonListProps> = ({
  persons,
  page,
  onPageChange,
  totalPages,
}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <ul className="list-unstyled p-0 w-100">
        {persons.map((person, index) => (
          <ListItemWrapper key={person.name + index}>
            <PersonListItem person={person} />
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

export default PersonsList;

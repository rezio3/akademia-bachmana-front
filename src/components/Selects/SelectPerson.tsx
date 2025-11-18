import { Autocomplete, Box, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { ControllerRenderProps } from "react-hook-form";

import { queryKeys } from "../../assets/queryKeys";
import { useEffect, useState } from "react";
import {
  getPersonsDropdownList,
  type Person,
  type PersonsResponse,
} from "../persons/persons";
import { getLocationLabelById, getPersonTypeLabelById } from "../../common";
import CustomText from "../elements/CustomText";

type SelectPerson = {
  field: ControllerRenderProps<any, any>;
  isMusician: boolean;
  inputLabel: string;
};

const SelectPerson: React.FC<SelectPerson> = ({
  field,
  isMusician,
  inputLabel,
}) => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery<PersonsResponse>({
    queryKey: isMusician
      ? queryKeys.musiciansDropdown.musiciansDropdownList(debounced)
      : queryKeys.leadersDropdown.leadersDropdownList(debounced),
    queryFn: () => getPersonsDropdownList(debounced, isMusician),
  });

  const persons: Person[] = data?.persons || [];

  if (isError) {
    console.log(isError);
  }

  return (
    <Autocomplete
      className="mt-2 mb-2 w-50"
      value={field.value || null}
      onChange={(_, newValue) => field.onChange(newValue)}
      inputValue={search}
      onInputChange={(_, newInput) => setSearch(newInput)}
      options={persons}
      loading={isLoading}
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box>
            <span>{option.name}</span>
            <br />
            <CustomText
              headerType="h6"
              fontSize={12}
              className="text0secondary"
            >
              {isMusician
                ? ""
                : `${getPersonTypeLabelById(option.personType)} - `}
              {getLocationLabelById(option.location)}
            </CustomText>
          </Box>
        </Box>
      )}
      filterOptions={(x) => x}
      isOptionEqualToValue={(opt, val) => opt._id === val._id}
      renderInput={(params) => <TextField {...params} label={inputLabel} />}
    />
  );
};

export default SelectPerson;

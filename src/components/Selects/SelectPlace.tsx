import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { ControllerRenderProps, FieldError } from "react-hook-form";
import {
  getPlacesList,
  type Place,
  type PlacesResponse,
} from "../places/places";
import { queryKeys } from "../../assets/queryKeys";
import { useEffect, useState } from "react";

type SelectPlaceProps = {
  field: ControllerRenderProps<any, any>;
  fieldState: { error?: FieldError | undefined };
};

const SelectPlace: React.FC<SelectPlaceProps> = ({ field, fieldState }) => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery<PlacesResponse>({
    queryKey: queryKeys.placesPage.placesList(undefined, debounced),
    queryFn: () => getPlacesList(undefined, undefined, debounced),
  });

  const places: Place[] = data?.places || [];

  if (isError) {
    console.log(isError);
  }

  return (
    <Autocomplete
      className="mt-2 mb-3 w-100"
      value={field.value || null}
      onChange={(_, newValue) => field.onChange(newValue)}
      inputValue={search}
      onInputChange={(_, newInput) => setSearch(newInput)}
      options={places}
      loading={isLoading}
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      isOptionEqualToValue={(opt, val) => opt._id === val._id}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Placówka*"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default SelectPlace;

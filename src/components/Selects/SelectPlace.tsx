import { Autocomplete, Box, TextField, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { ControllerRenderProps, FieldError } from "react-hook-form";
import {
  getPlacesList,
  type Place,
  type PlacesResponse,
} from "../places/places";
import { queryKeys } from "../../assets/queryKeys";
import { useEffect, useState } from "react";
import CustomText from "../elements/CustomText";
import { getLocationLabelById } from "../../common";
import AddIcon from "@mui/icons-material/Add";
import AddOrEditPlaceModal from "../places/AddOrEditPlaceModal";

type SelectPlaceProps = {
  field: ControllerRenderProps<any, any>;
  fieldState: { error?: FieldError | undefined };
};

const SelectPlace: React.FC<SelectPlaceProps> = ({ field, fieldState }) => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [openAddPlaceModal, setOpenAddPlaceModal] = useState(false);
  const [newlyAddedPlace, setNewlyAddedPlace] = useState<Place | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery<PlacesResponse>({
    queryKey: queryKeys.placesPage.placesList(undefined, debounced),
    queryFn: () => getPlacesList(undefined, undefined, debounced),
  });

  const places: Place[] = data?.places || [];

  // Automatycznie ustaw nowo dodaną placówkę
  useEffect(() => {
    if (newlyAddedPlace) {
      field.onChange(newlyAddedPlace);
      setNewlyAddedPlace(null);
    }
  }, [newlyAddedPlace, field]);

  if (isError) {
    console.log(isError);
  }

  return (
    <>
      <div className="d-flex align-items-start gap-2 mt-2 mb-3 w-100">
        <Autocomplete
          className="flex-grow-1"
          value={field.value || null}
          onChange={(_, newValue) => field.onChange(newValue)}
          inputValue={search}
          onInputChange={(_, newInput) => setSearch(newInput)}
          options={places}
          loading={isLoading}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box>
                <span>{option.name}</span>
                <br />
                <CustomText
                  headerType="h6"
                  fontSize={12}
                  className="text-secondary"
                >
                  {getLocationLabelById(option.locationTypeId)}
                </CustomText>
              </Box>
            </Box>
          )}
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddPlaceModal(true)}
          sx={{ minWidth: "unset", padding: "15px", height: "56px" }}
        >
          <AddIcon />
        </Button>
      </div>

      <AddOrEditPlaceModal
        open={openAddPlaceModal}
        handleClose={() => setOpenAddPlaceModal(false)}
        onPlaceAdded={(place) => setNewlyAddedPlace(place)}
      />
    </>
  );
};

export default SelectPlace;

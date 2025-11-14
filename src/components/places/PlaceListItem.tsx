import { deletePlace, type Place } from "./places";
import "./PlaceListItem.scss";
import HeaderText from "../elements/HeaderText";
import { Button, Divider } from "@mui/material";
import { getLocationLabelById } from "../../common";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddOrEditPlaceModal from "./AddOrEditPlaceModal";
import { useState } from "react";
import ConfirmModal from "../elements/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../assets/queryKeys";

type PlaceListItemProps = {
  place: Place;
};

const PlaceListItem: React.FC<PlaceListItemProps> = ({ place }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const queryClient = useQueryClient();

  const deletePlaceMutation = useMutation({
    mutationFn: (_id: string) => deletePlace(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.placesPage.placesList(1, ""),
      });
    },
    onError: (error) => {
      console.error("Błąd podczas usuwania placówki:", error);
    },
  });
  return (
    <>
      <div className="w-100 d-flex mb-2 align-items-center justify-content-between">
        <HeaderText fontSize={18} fontWeight={500}>
          {place.name}
        </HeaderText>
        <HeaderText headerType="h5" fontSize={16} fontWeight={500}>
          {getLocationLabelById(place.locationTypeId)}
        </HeaderText>
      </div>
      <Divider
        sx={{
          borderColor: "rgba(0, 0, 0, 0.5)",
          marginBottom: "10px",
        }}
      />
      <div className="place-list-item-table">
        <div className="labels">
          <span>Adres</span>
          <span>Telefon</span>
          <span>Email</span>
          <span>Faktury</span>
          <span>Osoba kontaktowa</span>
          <span>Komentarz</span>
        </div>
        <div className="values">
          <span>{place.address || "-"}</span>
          <span>{place.phone || "-"}</span>
          <span>{place.email || "-"}</span>
          <span>
            {place.invoiceEmail || place.email || "-"}
            <br />
            {place.nip ? (
              <>
                <b>NIP: </b>
                {place.nip}
              </>
            ) : (
              ""
            )}
            <br />
            {place.regon ? (
              <>
                <b>REGON: </b>
                {place.regon}
              </>
            ) : (
              ""
            )}
          </span>
          <span>{place.contactPerson || "-"}</span>
          <span>{place.description || "-"}</span>
        </div>
      </div>
      <div className="d-flex gap-2 mt-2">
        <Button
          variant="contained"
          size="small"
          color="info"
          onClick={() => setOpenEdit(true)}
        >
          Edytuj
          <EditIcon fontSize="small" className="ms-2" />
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={() => setOpenDeleteConfirmModal(true)}
        >
          Usuń
          <DeleteIcon fontSize="small" className="ms-1" />
        </Button>
      </div>
      <AddOrEditPlaceModal
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        placeToEdit={place}
      />
      <ConfirmModal
        open={openDeleteConfirmModal}
        handleClose={() => setOpenDeleteConfirmModal(false)}
        onConfirm={() => {
          deletePlaceMutation.mutate(place._id!);
        }}
        description="Czy na pewno chcesz usunąć tę placówkę?"
      />
    </>
  );
};

export default PlaceListItem;

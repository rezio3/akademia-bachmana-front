import { deletePlacowka, type Placowka } from "./placowki";
import "./PlacowkaListItem.scss";
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

type PlacowkaListItemProps = {
  placowka: Placowka;
};

const PlacowkaListItem: React.FC<PlacowkaListItemProps> = ({ placowka }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const queryClient = useQueryClient();

  const deletePlacowkaMutation = useMutation({
    mutationFn: (_id: string) => deletePlacowka(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.placowkiPage.placowkiList(1, ""),
      });
    },
    onError: (error) => {
      console.error("Błąd podczas usuwania placówki:", error);
    },
  });
  return (
    <div className="placowka-list-item-container">
      <div className="w-100 d-flex mb-2 align-items-center justify-content-between">
        <HeaderText fontSize={18} fontWeight={500}>
          {placowka.name}
        </HeaderText>
        <HeaderText headerType="h5" fontSize={16} fontWeight={500}>
          {getLocationLabelById(placowka.locationTypeId)}
        </HeaderText>
      </div>
      <Divider
        sx={{
          borderColor: "rgba(0, 0, 0, 0.5)",
          marginBottom: "10px",
        }}
      />
      <div className="placowka-list-item-table">
        <div className="labels">
          <span>Adres</span>
          <span>Telefon</span>
          <span>Email</span>
          <span>Faktury</span>
          <span>Osoba kontaktowa</span>
          <span>Komentarz</span>
        </div>
        <div className="values">
          <span>{placowka.address || "-"}</span>
          <span>{placowka.phone || "-"}</span>
          <span>{placowka.email || "-"}</span>
          <span>
            {placowka.invoiceEmail || placowka.email || "-"}
            <br />
            {placowka.nip ? (
              <>
                <b>NIP: </b>
                {placowka.nip}
              </>
            ) : (
              ""
            )}
            <br />
            {placowka.regon ? (
              <>
                <b>REGON: </b>
                {placowka.regon}
              </>
            ) : (
              ""
            )}
          </span>
          <span>{placowka.contactPerson || "-"}</span>
          <span>{placowka.description || "-"}</span>
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
        placowkaToEdit={placowka}
      />
      <ConfirmModal
        open={openDeleteConfirmModal}
        handleClose={() => setOpenDeleteConfirmModal(false)}
        onConfirm={() => {
          deletePlacowkaMutation.mutate(placowka._id!);
        }}
        description="Czy na pewno chcesz usunąć tę placówkę?"
      />
    </div>
  );
};

export default PlacowkaListItem;

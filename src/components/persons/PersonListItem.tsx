import "./PersonListItem.scss";
import HeaderText from "../elements/HeaderText";
import { Button, Divider } from "@mui/material";
import { getLocationLabelById, getPersonTypeLabelById } from "../../common";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ConfirmModal from "../elements/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../assets/queryKeys";
import { deletePerson, type Person } from "./persons";

import PersonIcon from "@mui/icons-material/Person";
import AddOrEditPersonModal from "./AddOrEditPersonModal";
import { useNotification } from "../../assets/NotificationProvider";

type PersonListItemProps = {
  person: Person;
};

const PersonListItem: React.FC<PersonListItemProps> = ({ person }) => {
  const { showNotification } = useNotification();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const queryClient = useQueryClient();

  const deletePersonMutation = useMutation({
    mutationFn: (_id: string) => deletePerson(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.personsPage.personsList(1, ""),
      });
      showNotification("success", "Usunięto osobę.");
    },
    onError: (error) => {
      console.error("Błąd podczas usuwania osoby:", error);
      showNotification("error", "Błąd podczas usuwania osoby.");
    },
  });

  return (
    <>
      <div className="w-100 d-flex mb-2 align-items-center justify-content-between ">
        <div className="d-flex align-items-end gap-2">
          <PersonIcon />
          <HeaderText fontSize={18} fontWeight={500}>
            {person.name}
          </HeaderText>
          <HeaderText headerType="h5" fontSize={18} fontWeight={600}>
            - {getPersonTypeLabelById(person.personType)}
          </HeaderText>
        </div>
        <HeaderText headerType="h5" fontSize={16} fontWeight={500}>
          {getLocationLabelById(person.location)}
        </HeaderText>
      </div>
      <Divider
        sx={{
          borderColor: "rgba(0, 0, 0, 0.5)",
          marginBottom: "10px",
        }}
      />
      <div className="person-list-item-table">
        <div className="labels">
          <span>Telefon</span>
          <span>Email</span>
          <span>Komentarz</span>
        </div>
        <div className="values">
          <span>{person.phone || "-"}</span>
          <span>{person.email || "-"}</span>
          <span>{person.description || "-"}</span>
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
      <AddOrEditPersonModal
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        personToEdit={person}
      />
      <ConfirmModal
        open={openDeleteConfirmModal}
        handleClose={() => setOpenDeleteConfirmModal(false)}
        onConfirm={() => {
          deletePersonMutation.mutate(person._id!);
        }}
        description="Czy na pewno chcesz usunąć tę osobę?"
      />
    </>
  );
};

export default PersonListItem;

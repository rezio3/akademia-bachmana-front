import { Button } from "@mui/material";
import AddOrEditPlaceModal from "./AddOrEditPlaceModal";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const Actions = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Dodaj Placówkę
        <AddIcon className="ms-2" />
      </Button>
      <AddOrEditPlaceModal handleClose={handleClose} open={open} />
    </>
  );
};

export default Actions;

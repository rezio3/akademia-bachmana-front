import { Button } from "@mui/material";
// import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddOrEditPersonModal from "./AddOrEditPersonModal";

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
        Dodaj osobę
        <AddIcon className="ms-2" />
      </Button>
      <AddOrEditPersonModal handleClose={handleClose} open={open} />
    </>
  );
};

export default Actions;

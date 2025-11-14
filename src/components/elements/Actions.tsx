import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, type ReactNode } from "react";

type ModalInjectedProps = {
  open: boolean;
  handleClose: () => void;
};

type ActionsProps = {
  label: string;
  modal: (props: ModalInjectedProps) => ReactNode;
};

const Actions = ({ label, modal }: ActionsProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {label}
        <AddIcon className="ms-2" />
      </Button>
      {modal({ open, handleClose })}
    </>
  );
};

export default Actions;

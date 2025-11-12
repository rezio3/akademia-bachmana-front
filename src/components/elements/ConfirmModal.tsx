import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type ConfirmModalProps = {
  handleClose: () => void;
  open: boolean;
  onConfirm: () => void;
  description: string;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  handleClose,
  open,
  onConfirm,
  description,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Potwierdzenie"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Anuluj
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onConfirm();
            handleClose();
          }}
          autoFocus
          color="error"
        >
          Usuń
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;

import React, { Dispatch, SetStateAction } from "react";
import Button from "@mui/material";
import Dialog from "@mui/material";
import DialogActions from "@mui/material";
import DialogContent from "@mui/material";
import DialogContentText from "@mui/material";
import DialogTitle from "@mui/material";

interface AlertProps {
  prompt: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AlertDialog: React.FC<AlertProps> = ({ prompt, open, setOpen }) => {
  const [message, setMessage] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (prompt === "delete") {
    setMessage("Do you want to delete this post?");
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{{ message }}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;

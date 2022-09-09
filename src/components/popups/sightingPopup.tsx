import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

interface PopUpProps {
  message: string;
  open: boolean;
  //Add type for setOpen as a prop, Dispatch as SetStateAction are just the types for the set state from a useState
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SightingPopUp: React.FC<PopUpProps> = ({ message, open, setOpen }) => {
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setOpen(false);
  };

  useEffect(() => {
    switch (message) {
      case "Could not post sighting, try again.":
        setAlertSeverity("error");
        break;
      case "Sighting posted, thanks Spotter!":
        setAlertSeverity("success");
        break;
      default:
        setAlertSeverity("info");
        break;
    }
  }, [message]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleClick}
        type="submit"
      >
        Submit sighting
      </Button>
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={handleClose}
            severity={alertSeverity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
};

export default SightingPopUp;

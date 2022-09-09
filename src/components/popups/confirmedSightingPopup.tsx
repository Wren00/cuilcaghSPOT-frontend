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

const ConfirmedSightingPopUp: React.FC<PopUpProps> = ({
  message,
  open,
  setOpen,
}) => {
  //Create a state to handle alert severity aka the background colour of the alert snackbar
  //The type 'AlertColor' is a material UI thing, basically it can be one of four values: "success" | "info" | "warning" | "error"
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");

  const handleClick = () => {
    //Use the passed down setOpen instead, and make it to be the opposite of whatever it previously was,
    //e.g. if it was false then make it the opposite of false aka true
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
      case "Sighting is now confirmed with more than 5 upvotes! You are being redirected back to the sightings page!":
        setAlertSeverity("success");
        break;
      default:
        setAlertSeverity("error");
        break;
    }
  }, [message]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
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

export default ConfirmedSightingPopUp;

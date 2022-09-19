import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

interface PopUpProps {
  message: string;
  open: boolean;
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

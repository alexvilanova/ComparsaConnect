import React from "react";
import { useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
// import { RootState } from "./store";
import { useNotification } from "./useNotification";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { clearNotification } = useNotification();

  const handleClose = (_, reason) =>
    reason !== "clickaway" && clearNotification();

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.timeout}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}

    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

import { Alert, Snackbar } from "@mui/material";

function AlertComponent(props: any) {
  const { message, closeAlert } = props;
  return (
    <Snackbar
      open={message.isOpen}
      autoHideDuration={3000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={closeAlert}
        severity={message.type == "success" ? "success" : "error"}
      >
        {message.displayMessage}
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { makeStyles } from "@mui/material";
import { setSnackbar } from "../../../store/SnackBar";

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2)
//     }
//   }
// }));

const SnackBar = () => {
  
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal } = state;

  const dispatch = useDispatch();
  const snackbarOpen = useSelector(state => state.snackbar.snackbarOpen);
  const snackbarType = useSelector(state => state.snackbar.snackbarType);
  const snackbarMessage = useSelector(state => state.snackbar.snackbarMessage);
  const snackbarSeverity = useSelector(state => state.snackbar.snackbarSeverity);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;

export const SET_SNACKBAR = "teamly/settings/SET_SNACKBAR";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarSeverity: "success",
  snackbarMessage: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      const { snackbarOpen, snackbarMessage, snackbarType,snackbarSeverity } = action;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarSeverity,
        snackbarMessage
      };
    default:
      return state;
  }
};

export const setSnackbar = (
  snackbarOpen,
  snackbarType = "success",
  snackbarSeverity = "success",
  snackbarMessage = ""
) => ({
  type: SET_SNACKBAR,
  snackbarOpen,
  snackbarType,
  snackbarSeverity,
  snackbarMessage
});


// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     snackbarOpen: false,
//     snackbarType: "success",
//     snackbarMessage: ""
// }

// export const SnackbarSlice = createSlice({
//   name: 'snackbar',
//   initialState,
//   reducers: {

//     setSnackbar:(state,action) => {
//       const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;
//       state.snackbarOpen = snackbarOpen;
//       state.snackbarType = snackbarType;
//       state.snackbarMessage = snackbarMessage;
      
//     },
    
//   },
// })

// // Action creators are generated for each case reducer function
// export const { setSnackbar } = SnackbarSlice.actions;

// export default SnackbarSlice.reducer;
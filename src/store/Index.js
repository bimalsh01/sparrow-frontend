import { configureStore } from "@reduxjs/toolkit";
import Auth from './Slice';
import snackbar from "./SnackBar";
import qsn from "./Question";
import OtherUser from "./OtherUser";


export const store = configureStore({
    reducer: {
        Auth,snackbar,qsn, OtherUser
    },
})


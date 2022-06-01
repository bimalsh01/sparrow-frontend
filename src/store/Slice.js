import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    phone: '',
    hash: ''
  },
  name: '',
  profile_upload: '',
  qsn: {
    questionName: '',
    postedBy: {
      fname: '',
      lname: '',
      createdAt: '',
    }
  },
  ans:null
}

export const AllSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setAuth: (state, action) => {
      const { user } = action.payload;
      console.log("Hello");
      state.user = user;
      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },

    setOtp: (state, action) => {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;

    },

    setName: (state, action) => {
      state.name = action.payload;
      console.log(state.name);
    },

    setProfile: (state, action) => {
      state.profile_upload = action.payload;
    },

    setQsn: (state, action) => {
      state.qsn = action.payload;
    },
    setAns: (state, action) => {
      state.ans = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { setAuth, setOtp, setName, setProfile, setQsn, setAns } = AllSlice.actions;

export default AllSlice.reducer;
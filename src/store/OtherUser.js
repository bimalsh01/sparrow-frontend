import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    followers:''
  
}

export const OtherUserSlice = createSlice({
  name: 'OtherUser',
  initialState,
  reducers: {

    setOtherUser:(state,action) =>{
        state.followers = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOtherUser } = OtherUserSlice.actions;

export default OtherUserSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    questionName:'',
    postedBy:{
        fname:'',
        lname:'',
        createdAt:'',
    }
  
}

export const QuestionSlice = createSlice({
  name: 'qsn',
  initialState,
  reducers: {

    setQsn:(state,action) =>{
        state.qsn = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setQsn } = QuestionSlice.actions;

export default QuestionSlice.reducer;
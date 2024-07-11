import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  myPostedAllJob: [],
  allJob: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    setJob(state, value) {
      // value. payload me pura object aa rha hai jisme msg , name but we need only data thats why we use .data(dot data )
      state.myPostedAllJob = value.payload.data;
    },
    setAllJob(state, value) {
      state.allJob = value.payload.data;
    },
  },
});

export const { setJob,setAllJob } = jobSlice.actions;
export default jobSlice.reducer;

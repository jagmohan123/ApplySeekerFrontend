import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  myAppliedAllJob: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    setApplication(state, value) {
      // value. payload me pura object aa rha hai jisme msg , name but we need only data thats why we use .data(dot data )
      state.myAppliedAllJob = value.payload;
    },
  },
});

export const { setApplication } = applicationSlice.actions;
export default applicationSlice.reducer;

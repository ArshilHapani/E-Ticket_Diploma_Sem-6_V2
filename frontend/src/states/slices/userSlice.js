import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      no_ticket: "",
      p_balance: "",
      p_dob: "",
      p_email: "",
      p_id: "",
      p_img: "",
      p_name: "",
      p_no: "",
      p_uname: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      console.log("User state active");
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;

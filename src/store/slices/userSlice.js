import { createSlice } from "@reduxjs/toolkit";

// Create User Slice
const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;

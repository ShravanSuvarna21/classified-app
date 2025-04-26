import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Axios";
export const fetchUserAccount = createAsyncThunk(
  "user/fetchUserAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/account", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue({
        message: "Something went wrong",
      });
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState:{
    data: [],
    isLoggedIn: false,
    serverErr: null,
  },
  reducers: {
    login: (state, action) => {
        console.log("action",action)
      state.data = true
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.data = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAccount.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchUserAccount.rejected, (state, action) => {
      state.serverErr = action.payload;
    });
  },
});
export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import { LoginData } from "../thunk/UserThunk";
import { ClearUserCredentials, GetUserCredentials, storeUserCredentails } from "../../utils/HalperFunction";

;

const initialState={
  loading: "idle",
  error: null,
userCredentials:GetUserCredentials()
}

export const userDataSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    logout(state) {
      state.userCredentials = null;
      ClearUserCredentials();
    },
  },

  extraReducers: (builder) => {
    builder
      // Handling login
      .addCase(LoginData.pending, (state) => {
        state.loading = "Loading";
      })
      .addCase(LoginData.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
     state.userCredentials=action.payload
     const { access, refresh, user_type } = action.payload;
     storeUserCredentails({access,refresh,user_type})
      })

      .addCase(LoginData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
  },
});


export default userDataSlice.reducer;

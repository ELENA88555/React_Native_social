import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  nickName: null,
  email: null,
  comment: "",
  userPhoto: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      email: payload.email,
      userPhoto: payload.userPhoto,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
changePhoto: (state, {payload}) =>({
  // ...state,
  userPhoto: payload.userPhoto,
}),

  addComent: (state, { payload }) => ({
    comment: payload,
  }),
});
console.log(authSlice)

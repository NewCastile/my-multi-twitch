import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProfileState {
  providerAccountId: string;
  nickname: string;
  picture: string;
}

// Define the initial state using that type
const initialState: ProfileState = {
  providerAccountId: "",
  nickname: "",
  picture: "",
};

export const profileSlice = createSlice({
  name: "accessToken",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      state.providerAccountId = action.payload.providerAccountId;
      state.nickname = action.payload.nickname;
      state.picture = action.payload.picture;
    },
  },
});

export const { setProfile } = profileSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default profileSlice.reducer;

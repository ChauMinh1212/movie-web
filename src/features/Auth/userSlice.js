import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import auth, { db } from "./firebaseConfig";

const providers = {
  Gprovider: new GoogleAuthProvider(),
  Fprovider: new FacebookAuthProvider(),
};

export const loginWithGoogle = createAsyncThunk("user/loginGG", async () => {
  try {
    const result = await signInWithPopup(auth, providers.Gprovider);
    const details = getAdditionalUserInfo(result);

    const token = result.user.accessToken;
    // The signed-in user info.
    const { displayName, email, photoURL, uid } = result.user;
    localStorage.setItem("access_token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({ displayName, email, photoURL, uid })
    );

    if (details.isNewUser) {
      await setDoc(doc(db, "users", uid), {
        displayName,
        email,
        photoURL,
        uid,
        followsID: [],
      });
    }

    return { displayName, email, photoURL, uid };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
});

export const loginWithFacebook = createAsyncThunk("user/loginFB", async () => {
  try {
    const result = await signInWithPopup(auth, providers.Fprovider);

    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const { displayName, email, photoURL, uid } = result.user;
    localStorage.setItem("access_token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({ displayName, email, photoURL, uid })
    );
    return { displayName, email, photoURL, uid };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    // ...
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {
    logOut(state) {
      localStorage.clear();
      state.current = {};
    },
  },
  extraReducers: {
    [loginWithGoogle.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [loginWithFacebook.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logOut } = actions;
export default reducer;

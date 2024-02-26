import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { getDatabase, ref, set, update } from "firebase/database";

export const registerThunk = createAsyncThunk(
  "auth/registerAndSaveUserData",
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      const db = getDatabase();
      const userData = {
        email: email,
        displayName: displayName,
      };

      await set(ref(db, `users/${uid}`), userData);

      return { uid, email, displayName };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (body, { rejectWithValue }) => {
    // async (body, { rejectWithValue, dispatch }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );
      const { uid, displayName, email } = userCredential.user;
      return { uid, displayName, email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logoutThunk",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDisplayNameThunk = createAsyncThunk(
  "user/updateDisplayName",
  async ({ userId, newDisplayName }) => {
    try {
      const userRef = ref(db, `users/${userId}`);
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      await update(userRef, { displayName: newDisplayName });
      return newDisplayName;
    } catch (error) {
      console.error("Cant change new Name", error);
      throw error;
    }
  }
);
export const updateEmailThunk = createAsyncThunk(
  "user/updateEmail",
  async ({ userId, newEmail }) => {
    try {
      const userRef = ref(db, `users/${userId}`);
      await updateProfile(auth.currentUser, {
        email: newEmail,
      });
      await update(userRef, { email: newEmail });
      return newEmail;
    } catch (error) {
      console.error("Cant change new Email", error);
      throw error;
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Not authorized.");
      }

      const credentials = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credentials);

      await updatePassword(user, newPassword);

      return "Password successfully changed.";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

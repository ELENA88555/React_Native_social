import { auth } from "../../../firebase/config";

import { authSlice } from "./authReducer";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { collection,setDoc, addDoc } from "firebase/firestore";

const {  authSignOut } = authSlice.actions
 

export const updateUserProfile = async (photoURL) => {
  const user = auth.currentUser;

  if (user) {
     try {
      await updateProfile(user,  {photoURL: photoURL},);
    } catch (error) {
      throw error;
    }
  }
};



// export const authSignUpUser = ({ email, password }) =>
// {createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });}

// export const authSignUpUser = async ({ email, password }) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     console.log( error.message);
//   }
// };


export const authSignUpUser = ({ email, password,nickName, userPhoto }) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      const currentUser = auth.currentUser;
      currentUser.updateProfile({ displayName: nickName });

      authSlice.actions.updateUserProfile({
        userId: user.uid,
        nickName:  user.displayName,
        userPhoto: user.photoURL
      });

      const docRef = addDoc(collection(db, "users"), {
        name: displayName,
        email,
      });
    })
    .catch((error) => {
      console.log( error.message);
    });





// export const authSignUpUser = ({ email, password, nickname }) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     await auth.createUserWithEmailAndPassword(email, password);

//     const user = await auth.currentUser;

//     await user.updateProfile({
//       displayName: nickname,
//     });

//     const { displayName, uid } = await auth.currentUser;

//     const userUpdateProfile = {
//       nickName: displayName,
//       userId: uid,
//     };

//     dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
//   } catch (error) {
//      console.log("error.message", error.message);
//   }
// };   

      


export const authStateChanged = () => async (dispatch, getState) => {
  await  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
        email: user.email,
      };
      dispatch(authSlice.actions.authStateChange({stateChange: true}))
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile))
    }
  });  
};





export const authSingIn = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};



export const authSingOutUser = () => async (dispatch, getState) => {
  await signOut(auth)
  dispatch(authSignOut())
};

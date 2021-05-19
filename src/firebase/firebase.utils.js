import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCRgglLHMuvcI2rThGdO0wIC3M3faRacT8",
  authDomain: "ecommerce-project-3a7e5.firebaseapp.com",
  projectId: "ecommerce-project-3a7e5",
  storageBucket: "ecommerce-project-3a7e5.appspot.com",
  messagingSenderId: "664353615863",
  appId: "1:664353615863:web:da87eaa9e30772abd908f2",
  measurementId: "G-LL4S3WZJB1",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

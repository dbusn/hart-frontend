import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, DocumentReference, Firestore, doc, setDoc } from "firebase/firestore"
import { combination, state } from "@/helpers/state.js"

const firebaseConfig = {
  apiKey: "AIzaSyAADUKI0VsiphL6ToyW_ASGl2TUB1hCD6o",
  authDomain: "training-4fbe2.firebaseapp.com",
  projectId: "training-4fbe2",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export default class ActivityLogger {

  public static async log_activity(scale: string) {
    const d = new Date()

    try {
      const docRef = await addDoc(collection(db, "Pattern-Gen - Data2"), {
        user: state.userVal,
        scale: scale,
        time: d.getTime(),
        combination: combination.updatedNumber
      });
      console.log("Document written with ID: ", docRef.id);
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
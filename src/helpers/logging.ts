import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAADUKI0VsiphL6ToyW_ASGl2TUB1hCD6o",
    authDomain: "training-4fbe2.firebaseapp.com",
    projectId: "training-4fbe2",
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export default class ActivityLogger {

    /*
    Log the forcedidentifcation activity
    */
    public static async log_activity(type : string, sent: string, guess: string){
        const d = new Date()
        let res;

        
        if(sent == guess){
            res = "Correct"
        } else {
            res = "Incorrect"
        }
        
        try {
            const docRef = await addDoc(collection(db, "User-Testing"), {
                type: type,
                sent: sent,
                guess: guess,
                result: res,
                time: d.getTime()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

}
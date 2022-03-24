import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, DocumentReference, Firestore, doc, setDoc } from "firebase/firestore"
import { progress, state } from "@/helpers/state.js"

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
    public static async log_activity(type: string, sent: string, guess: string){
        const d = new Date()

        console.log(state.userVal);
        
        let res;
        
        if(sent == guess){
            res = "Correct"
        } else {
            res = "Incorrect"
        }

        console.log(res);
                
        try {
            const docRef = await addDoc(collection(db, "User-Testing - Data"), {
                user: state.userVal,
                progress: progress.userProgress,
                type: type,
                sent: sent,
                guess: guess,
                result: res,
                time: d.getTime()
            });
            console.log("Document written with ID: ", docRef.id);
        } 
        catch (e) {
            console.error("Error adding document: ", e);
        }                
    }
    
    public static async log_progress(type: string){
        const d = new Date()

        try {
            const docRef = await addDoc(collection(db, "User-Testing - Progress/"+state.userVal+"/progress"), {
                progress: progress.userProgress,
                type: type,
                time: d.getTime()
            });
            console.log("Document written with ID: ", docRef.id);
        } 
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }

}


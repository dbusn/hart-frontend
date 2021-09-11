import { initializeApp } from "firebase/app";
import { logEvent, getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAADUKI0VsiphL6ToyW_ASGl2TUB1hCD6o",
    authDomain: "training-4fbe2.firebaseapp.com",
    projectId: "training-4fbe2",
    storageBucket: "training-4fbe2.appspot.com",
    messagingSenderId: "678278842051",
    appId: "1:678278842051:web:05d5105e8226ab7f408476",
    measurementId: "G-1ZWGYS9MQ3"
  };

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default class ActivityLogger {

    /*
    a wrapper for the logEvent method
    */
    public static logGenericEvent(event_specification : any){
        logEvent(analytics, event_specification)
    }
}



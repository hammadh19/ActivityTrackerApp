import { doc, getDoc } from "firebase/firestore"
import { db} from "../firebase-config";
import CalculateBMR from "./CalculateBMR";

export default async function CalorieCalculator(activity, time) {
    const docRef = doc(db, "ActivityMET", activity);
    const docSnap = await getDoc(docRef);  
    if (docSnap.exists()) {
      const MET = docSnap.data().MET;
      const BMR = await CalculateBMR();
      const result = (BMR/24) * MET * time;
      console.log("result: " + Math.round(result));
      return Math.round(result);
    } else {
      console.log("No such document!");
    }         

  
}
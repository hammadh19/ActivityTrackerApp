import { doc, getDoc } from "firebase/firestore"
import { auth, db} from "../firebase-config";
import CalculateAge from "./CalculateAge";
import convertHeight from "./ConvertHeight";
import convertWeight from "./ConvertWeight";

export default async function CalculateBMR() {
    const userID = auth.currentUser.uid;
    const docRef = doc(db, "Users", userID);            
    const docSnap = await getDoc(docRef);  
    if (docSnap.exists()) {
      const height = docSnap.data().height;
      const heightUnit = docSnap.data().heightUnit;
      const newHeight = convertHeight(height,heightUnit);
      const weight = docSnap.data().weight;
      const weightUnit = docSnap.data().weightUnit;
      const newWeight = convertWeight(weight,weightUnit);
      console.log(newWeight);
      const gender = docSnap.data().gender;
      const age = await CalculateAge();

      if(gender === "male"){
        var result = (10 * newWeight) + (6.25 * newHeight) - (5 * age) + 5;
      } else if(gender === "female") {
        var result = (10 * newWeight) + (6.25 * newHeight) - (5 * age) - 161;
      }
      console.log(Math.round(result));
      return Math.round(result);
    } else {
      console.log("No such document!");
    }  
    
    

  
}
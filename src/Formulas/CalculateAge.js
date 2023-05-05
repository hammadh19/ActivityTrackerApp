import { doc, getDoc } from "firebase/firestore"
import { auth, db} from "../firebase-config";


export default async function CalculateAge() {
    const userID = auth.currentUser.uid;
    const docRef = doc(db, "Users", userID);            
    const docSnap = await getDoc(docRef);  
    if (docSnap.exists()) {
        const birthdate = docSnap.data().DOB.toDate(); // convert DOB timestamp to a date object
        const ageDiffMs = Date.now() - birthdate.getTime(); // calculate difference in milliseconds
        const ageDate = new Date(ageDiffMs); // convert age difference to a Date object
        const age = Math.abs(ageDate.getUTCFullYear() - 1970); // extract the year and calculate the age        
        console.log(age);
        return age;
      } else {
        console.log("No such document!");
      }         

  
}
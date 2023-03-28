import { doc, getDoc } from "firebase/firestore"
import { auth, db} from "../firebase-config";
import { getWeight } from "../FirebaseCalls/GetWeight";


export default async function Calculator(activity, time) {
    const userID = auth.currentUser.uid;
    const docRef = doc(db, "ActivityMET", activity);
    const docSnap = await getDoc(docRef);  
    if (docSnap.exists()) {
        const MET = docSnap.data().MET
        const weight = await getWeight(userID);
        console.log("weight: " + weight)
        const result = parseInt(time * MET * (weight/60))
        console.log("result: " + result)
        return result;
      } else {
        console.log("No such document!");
      }         

  
}
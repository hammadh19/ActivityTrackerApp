import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

async function getWeight(userID) {
    let weight = 0;
    const docRef = doc(db, "Users", userID);            
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      weight = docSnap.data().weight;
      return weight;
    } else {
      console.log("No such document!");
    }
  }

  export { getWeight }
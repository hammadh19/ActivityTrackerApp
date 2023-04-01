import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db} from "../firebase-config";

async function getAllActivities(userID) {
    const q = query(collection(db, "Activities"), where("userID", "==", userID))
    const querySnapshot = await getDocs(q);
    const activities = [];
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        
        activities.push(doc.data())
    });
    return activities;
}

export { getAllActivities }
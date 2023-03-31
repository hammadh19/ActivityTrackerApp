import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db} from "../firebase-config";

async function getCalories() {
    const userID = auth.currentUser.uid;
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    const endOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), startOfWeek.getDate() + 6);


    const q = query(collection(db, "Activities"), where("userID", "==", userID), where('DateTime', '>=', startOfWeek), where('DateTime', '<=', endOfWeek))
    const querySnapshot = await getDocs(q);
    const activities = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        
        activities.push(doc.data())
    });
    return activities;
}

export { getCalories }
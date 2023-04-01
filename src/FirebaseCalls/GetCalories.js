import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { auth, db} from "../firebase-config";

async function getCalories() {
    const userID = auth.currentUser.uid;
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    const endOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), startOfWeek.getDate() + 7);
    //console.log(startOfWeek)
    //console.log(endOfWeek)

    const startOfWeekTimestamp = Timestamp.fromDate(startOfWeek);
    const endOfWeekTimestamp = Timestamp.fromDate(endOfWeek);
    //console.log(startOfWeekTimestamp)
    //console.log(endOfWeekTimestamp)

    const q = query(
        collection(db, "Activities"), 
        where("userID", "==", userID), 
        where('DateTime', '>=', startOfWeekTimestamp), 
        where('DateTime', '<=', endOfWeekTimestamp)
    );
    const querySnapshot = await getDocs(q);
    const weeklyData = [];
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        
        const { Day, CaloriesBurnt } = doc.data();
        weeklyData.push({ Day, CaloriesBurnt })
    });
    return weeklyData;
}

export { getCalories }
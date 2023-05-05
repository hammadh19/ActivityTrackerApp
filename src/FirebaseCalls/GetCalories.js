import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db} from "../firebase-config";

async function getCaloriesThisWeek(userID) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); 

    const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    const endOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), startOfWeek.getDate() + 7);

    const startOfWeekTimestamp = Timestamp.fromDate(startOfWeek);
    const endOfWeekTimestamp = Timestamp.fromDate(endOfWeek);

    const q = query(
        collection(db, "Activities"), 
        where("userID", "==", userID), 
        where('DateTime', '>=', startOfWeekTimestamp), 
        where('DateTime', '<=', endOfWeekTimestamp)
    );
    const querySnapshot = await getDocs(q);
    const weeklyData = [];
    querySnapshot.forEach((doc) => {
        const { Day, CaloriesBurnt } = doc.data();
        weeklyData.push({ Day, CaloriesBurnt });
    });
    return weeklyData;
}

export { getCaloriesThisWeek }
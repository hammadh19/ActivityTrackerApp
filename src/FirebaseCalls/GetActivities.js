import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
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

async function getActivitiesThisMonth(userID) {
    const currentDate = new Date();

    const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 28);
    const startOfLastMonthTimestamp = Timestamp.fromDate(startOfLastMonth);
    console.log(startOfLastMonth)

    const q = query(
        collection(db, "Activities"), 
        where("userID", "==", userID), 
        where('DateTime', '>=', startOfLastMonthTimestamp), 
        where('DateTime', '<=', Timestamp.fromDate(currentDate))
    );
    const querySnapshot = await getDocs(q);
    const last4WeeksData = [];
    querySnapshot.forEach((doc) => {
        last4WeeksData.push(doc.data())
    });
    console.log(last4WeeksData)
    return last4WeeksData;
}

export { getAllActivities, getActivitiesThisMonth }
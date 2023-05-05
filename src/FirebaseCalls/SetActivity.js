import { addDoc, collection, Timestamp } from "firebase/firestore"; 
import { auth, db } from "../firebase-config";

export default async function addActivity(activity, calories, dateTime, time, timeUnit, distance, distanceUnit) {
    const userID = auth.currentUser.uid;
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(dateTime);
    const day = weekday[d.getDay()];
    await addDoc(collection(db, "Activities"), {
        userID: userID,
        Activity: activity,
        CaloriesBurnt: calories,
        DateTime: Timestamp.fromDate(d),
        Distance: distance,
        DistanceUnit: distanceUnit,
        Time: time,
        TimeUnit: timeUnit,
        Day: day,
    });
    console.log("Activity added to database")
}
import { addDoc, collection, Timestamp } from "firebase/firestore"; 
import { auth, db } from "../firebase-config";

export default async function addActivity(activity, calories, dateTime, time, distance, distanceUnit) {
    const userID = auth.currentUser.uid;
    await addDoc(collection(db, "Activities"), {
        userID: userID,
        Activity: activity,
        CaloriesBurnt: calories,
        DateTime: Timestamp.fromDate(new Date(dateTime)),
        Distance: distance,
        DistanceUnit: distanceUnit,
        Time: time
    });
    console.log("Activity added to database")
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db} from "../firebase-config";
import background from "../wallpaper.jpeg";

export default function ActivitiesPage() {
    const userID = auth.currentUser.uid;
    const [activityList, setActivityList] = useState([])
    const [activity, setActivity] = useState("");
    const [calories, setCalories] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [distance, setDistance] = useState("");
    const [distanceUnit, setDistanceUnit] = useState("");
    const [time, setTime] = useState("");
    
    useEffect(() => {
        getActivities();
    }, []);

    async function getActivities() {
        const q = query(collection(db, "Activities"), where("userID", "==", userID))
        const querySnapshot = await getDocs(q);
        const activities = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            
            activities.push(doc.data())
        });
        setActivityList(activities)
    }

    return(
        <div className='pageContainer'>

        <div className='formContainer'>
            <div className='form'>
            <h3 className='formTitle'> Graph </h3>
            
            </div>

            <div className='form'>
            <h3 className='formTitle'> Activities </h3>
            <div>
                {activityList.map((data, index) => {
                return (
                    <div key={index} className='activity'>
                    <p>Activity: {data.Activity} Date: {data.DateTime.toDate().toDateString()} </p>
                    <p>Time: {data.DateTime.toDate().toLocaleTimeString('en-US')} Calories Burned: {data.CaloriesBurnt}</p>
                    </div>
                );
                })}
            </div>
            </div>
        </div>

        <div className='formContainer'>
            <div className='form'>
            <h3 className='formTitle'> Stats </h3>
            
            </div>

            <div className='form'>
            <h3 className='formTitle'> Pie Chart </h3>
            
            </div>
        </div>

        </div>

    )
}
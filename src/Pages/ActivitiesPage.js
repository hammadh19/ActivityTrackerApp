import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db} from "../firebase-config";
import LineChart from "../Components/LineChart";
import { getAllActivities } from "../FirebaseCalls/GetActivities";
import { getCalories } from "../FirebaseCalls/GetCalories";
import { UserData } from "../Components/Data";
import background from "../wallpaper.jpeg";

export default function ActivitiesPage() {
    const [activityList, setActivityList] = useState([])
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.day),
        datasets: [
          {
            label: "Calories Burned",
            data: UserData.map((data) => data.userGain),
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    
    useEffect(() => {
        getActivities();
    }, []);

    async function getActivities() {
        const result = await getAllActivities();
        setActivityList(result);
    }

    return(
        <div className='pageContainer'>

        <div className='formContainer'>
            <div className='formActivity'>
            <h5 className='formTitle'> Average calories burned this week </h5>
            <LineChart chartData={userData} />
            
            </div>

            <div className='formActivity'>
            {/* <h3 className='formTitle'> Activities </h3> */}
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
            <div className='formActivity'>
            <h3 className='formTitle'> Stats </h3>
            
            </div>

            <div className='formActivity'>
            <h3 className='formTitle'> Pie Chart </h3>
            
            </div>
        </div>

        </div>

    )
}
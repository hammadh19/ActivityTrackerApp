import { useState, useEffect } from "react";
import LineChart from "../Components/LineChart";
import { getAllActivities } from "../FirebaseCalls/GetActivities";
import { getCalories } from "../FirebaseCalls/GetCalories";
import getWeeklyData from "../Components/WeeklyData";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import running_icon from '../running_icon.png'

export default function ActivitiesPage() {
    const [userID, setUserID] = useState("");
    const [activityList, setActivityList] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);
    const [Data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((authObj) => {
          unsub();
          if (authObj) {
            setUserID(auth.currentUser.uid)
          } else {
            navigate('/login');
          }
        });
      }, []);
    
    useEffect(() => {
        getActivities();
    }, [userID]);

    async function getActivities() {
        const activities = await getAllActivities(userID);
        setActivityList(activities);
        const result = await getCalories();
        setWeeklyData(result);
        const data = getWeeklyData(result)
        setData(data);
    }

    return(
        <div className='pageContainer'>
        
        <div className='formContainer'>
            <div className='formActivity'>
            <h5 className='formTitle'> Calories burnt this week </h5>
            {Object.keys(Data).length !== 0 && <LineChart chartData={Data} />}
            </div>

            <div className='formActivity'>
            {activityList.map((data, index) => {
                return (
                <div key={index} className='activity'>
                    <div className='activity-image'>
                        <img src={running_icon} height={50} width={50} />
                    </div>
                    <div className='activity-details'>
                        <p>Activity: {data.Activity}</p>
                        <p>Date: {data.DateTime.toDate().toDateString()}</p>
                        <p>Time: {data.DateTime.toDate().toLocaleTimeString('en-US')}</p>
                        <p>Calories Burned: {data.CaloriesBurnt} kcal</p>
                    </div>
                </div>
        );
    })}
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
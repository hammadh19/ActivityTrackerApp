import { useState, useEffect } from "react";
import LineChart from "../Components/LineChart";
import DoughnutChart from "../Components/DoughnutChart";
import { getAllActivities, getActivitiesThisMonth } from "../FirebaseCalls/GetActivities";
import { getCaloriesThisWeek } from "../FirebaseCalls/GetCalories";
import getDoughnutChartData from "../Components/DoughnutChartData";
import getWeeklyData from "../Components/WeeklyData";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import cycling_icon from '../Images/cycling_icon.png'
import running_icon from '../Images/running_icon.png'
import swimming_icon from '../Images/swimming_icon.png'
import jogging_icon from '../Images/jogging_icon.png'
import walking_icon from "../Images/walking_icon.png"
import rowing_icon from "../Images/rowing_icon.png"
import weightlifting_icon from "../Images/weightlifting_icon.png"


export default function ActivitiesPage() {
    const [userID, setUserID] = useState("");
    const [activityList, setActivityList] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);
    const [Data, setData] = useState({});
    const [doughnutChartData, setDoughnutChartData] = useState({});
    const [activitiesLast4Weeks, setActivitiesLast4Weeks] = useState("")
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
        const activities1 = await getActivitiesThisMonth(userID)
        setActivitiesLast4Weeks(activities1.length)
        setActivityList(activities);
        const result = await getCaloriesThisWeek(userID);
        setWeeklyData(result);
        const data = getWeeklyData(result)
        setData(data);
        const doughnutChartData = getDoughnutChartData(activities1)
        console.log(activities1.length)
        setDoughnutChartData(doughnutChartData)
    }

    return(
        <div className='pageContainer'>
        
        <div className='formContainer'>
            
            <div className='formActivityMobile'>
            <h3 className='formTitle'> Calories Burnt This Week: </h3>
            {Object.keys(Data).length !== 0 && <LineChart chartData={Data} />}
            </div>

            <div className='formActivity'>
            <h3 className='formTitle'> All Activities:</h3>
            {activityList.map((data, index) => {
                let activityImage;

                if (data.Activity === "Running(slow)" || data.Activity === "Running(fast)") {
                activityImage = <img src={running_icon} height={50} width={50} />;
                } else if (data.Activity === "Cycling(slow)" || data.Activity === "Cycling(fast)") {
                activityImage = <img src={cycling_icon} height={50} width={50} />;
                } else if (data.Activity === "Swimming(slow)" || data.Activity === "Swimming(fast)") {
                activityImage = <img src={swimming_icon} height={50} width={50} />;
                } else if (data.Activity === "Jogging") {
                    activityImage = <img src={jogging_icon} height={50} width={50} />;
                } else if (data.Activity === "Walking(slow)" || data.Activity === "Walking(fast)") {
                    activityImage = <img src={walking_icon} height={50} width={50} />;
                } else if (data.Activity === "Rowing(slow)" || data.Activity === "Rowing(fast)") {
                    activityImage = <img src={rowing_icon} height={50} width={50} />;
                } else if (data.Activity === "Weight Training") {
                    activityImage = <img src={weightlifting_icon} height={50} width={50} />;
                } 
                

                return (
                <div key={index} className='activity'>
                    <div className='activity-image'>
                    {activityImage}
                    </div>
                    <div className='activity-details'>
                    <p>{data.Activity}</p>
                    <p>{data.DateTime.toDate().toDateString()} {data.DateTime.toDate().toLocaleTimeString('en-US')}</p>
                    <p>{data.Time} {data.TimeUnit}</p>
                    <p>{data.CaloriesBurnt} kcal</p>
                    <p>{data.Distance} {data.DistanceUnit}</p>
                    </div>
                </div>
                );
            })}
            </div>
            
        </div>

        {<div className='formContainer'>
            <div className='formActivityMobile'>
            <p>Last 4 Weeks</p>
            <h2 className='formTitle' >{activitiesLast4Weeks}</h2>
            <p>Total Activities</p>
            
            </div>

            <div className='formActivityMobile'>
            <h3 className='formTitle'> Type Of Activities In Last 4 Weeks: </h3>
            {Object.keys(Data).length !== 0 && <DoughnutChart chartData={doughnutChartData} />}
            </div>
        </div> }

        </div>

    )
}
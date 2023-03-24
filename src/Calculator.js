import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc} from "firebase/firestore"
import { auth, db} from "./firebase-config";
import background from "./wallpaper.jpeg";

export default function CalculatorPage() {
    const userID = auth.currentUser.uid;
    const [activity, setActivity] = useState("");
    const [timeType, setTimeType] = useState("");
    const [time, setTime] = useState(0);

    const displayValues = () => {
        if(activity === ""){
            console.log("Please select an activity")
        }
        if(time === 0){
            console.log("Please enter a time")
        }
        if(timeType === ""){
            console.log("Please select a time unit")
        } else{
            console.log(activity);
            console.log(time);
            console.log(timeType);
        }
    }
    
    const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    //background: "#f7f7f7",
    fontFamily: "Arial",
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
    };

    const form = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "40px",
    maxWidth: "400px",
    width: "100%",
    };

    const input = {
    width: "100%",
    height: "40px",
    padding: "8px",
    borderRadius: "5px",
    border: "none",
    marginBottom: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    };

    const button = {
    background: "#2b70fe",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    };

    return(
        <div className="Profile Page" style={container}>
        <div style={form}>
        <h3 style={{ marginBottom: "20px", color: "#333" }}> Activity and calories burned calculator </h3>

        <select
        value={activity}
        onChange={(event) => {
        setActivity(event.target.value);
        }}
        style={input}
        >
        <option value="">Select Activity</option>
        <option value="running">Running</option>
        <option value="swimming">Swimming</option>
        <option value="cycling">Cycling</option>
        <option value="cycling">Cycling</option>
        <option value="cycling">Cycling</option>
        <option value="cycling">Cycling</option>
        <option value="cycling">Cycling</option>
        <option value="cycling">Cycling</option>
        <option value="cycling">Cycling</option>
        <option value="cycling">Cycling</option>

        </select>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <input
        placeholder="Enter time"
        style={input}
        onChange={(event) => {
        setTime(event.target.value);
        }}
        />

        <select
        value={timeType}
        onChange={(event) => {
        setTimeType(event.target.value);
        }}
        style={input}
        >
        <option value="">Select Unit</option>
        <option value="hours">Hours</option>
        <option value="minutes">Minutes</option>
        </select>
        </div>

        <button onClick={displayValues} style={button}> Calculate </button>
        </div>
        </div>
    )
}
import * as React from 'react';
import "../StyleSheets/Pages.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc} from "firebase/firestore"
import { auth, db} from "../firebase-config";
import background from "../wallpaper.jpeg";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

export default function CalculatorPage() {
    const userID = auth.currentUser.uid;
    const [activity, setActivity] = useState("");
    const [timeUnit, setTimeUnit] = useState("");
    const [time, setTime] = useState("");
    const [distanceUnit, setDistanceUnit] = useState("");
    const [distance, setDistance] = useState("");
    const [showResult, setShowResult] = useState(false); // state variable to show/hide result
    const [value, setValue] = React.useState(null);
    const [error, setError] = useState("");
    const [dateTimeError, setDateTimeError] = useState("");

    const displayValues = () => {
        if(activity === ""){
            setError("Please select an activity");
            return;
        }
        if(time === ""){
            setError("Please enter a time");
            return;
        }
        if(isNaN(time) || isNaN(distance)){
            setError("Please enter a valid time/distance");
            return;
        }
        if(timeUnit === ""){
            setError("Please select a time unit");
            return;
        }
        else{
            setError("");
            console.log(activity);
            console.log(time,timeUnit);
            console.log(distance, distanceUnit);
            setShowResult(true); // set state variable to show result
        }
    }

    const displayDateTime = () => {
        if(value === null){
            setDateTimeError("Please enter a date and time")
        }else{
            setDateTimeError("");
            console.log(value.$d)
        }
    }
    

    return(
        <div className="pageContainer">
            <div className='form'>
                <h3 style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}> Activity and calories burned calculator </h3>

                <select
                value={activity}
                onChange={(event) => {
                setActivity(event.target.value);
                }}
                className='input'
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
                    placeholder="Enter time taken"
                    className='input'
                    onChange={(event) => {
                    setTime(event.target.value);
                    }}
                    />

                    <select
                    value={timeUnit}
                    onChange={(event) => {
                    setTimeUnit(event.target.value);
                    }}
                    className='input'
                    >
                    <option value="">Select Unit</option>
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                    </select>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <input
                    placeholder="Enter distance"
                    className='input'
                    onChange={(event) => {
                    setDistance(event.target.value);
                    }}
                    />

                    <select
                    value={distanceUnit}
                    onChange={(event) => {
                    setDistanceUnit(event.target.value);
                    }}
                    className='input'
                    >
                    <option value="">Select Unit</option>
                    <option value="metres">Metres</option>
                    <option value="kilometres">Kilometres</option>
                    <option value="miles">Miles</option>
                    </select>
                </div>
                <p style={{ color: "red",  }}>{error}</p>

                <button onClick={displayValues} className='button'> Calculate </button>

                {showResult ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DesktopDateTimePicker']}>
                    <DesktopDateTimePicker label="Enter Date and Time" value={value} onChange={(newValue) => setValue(newValue)} />
                    </DemoContainer>
                    <p style={{ color: "red",  }}>{dateTimeError}</p>
                </LocalizationProvider>
                ) : null}

                {showResult ? (
                        <button onClick={displayDateTime} className='button'> Add to Activity Log </button>
                    ) : null}
            </div>
        </div>
    )
}
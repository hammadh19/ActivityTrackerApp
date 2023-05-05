import * as React from "react";
import "../StyleSheets/Pages.css"
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import CalorieCalculator from "../Formulas/CalorieCalculator";
import addActivity from "../FirebaseCalls/SetActivity";
import convertTime from "../Formulas/ConvertTime";

export default function CalculatorPage() {
    const [activity, setActivity] = useState("");
    const [timeUnit, setTimeUnit] = useState("");
    const [time, setTime] = useState(0);
    const [distanceUnit, setDistanceUnit] = useState("");
    const [distance, setDistance] = useState("");
    const [result, setResult] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [dateTimeError, setDateTimeError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function validation () {
        if(activity === ""){
            setError("Please select an activity");
            return;
        }
        if(time === "" || time === 0){
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
            let hours = convertTime(convertTime(time, timeUnit));
            setResult(await CalorieCalculator(activity, hours));
            console.log(hours)
            setShowResult(true);
        }
    }

    const displayDateTime = () => {
        if(value === ""){
            setDateTimeError("Please enter a date and time");
        }else{
            setDateTimeError("");
            console.log(time);
            addActivity(activity, result, value, time, timeUnit, distance, distanceUnit);
            setSuccessMessage("Successfully added activity");
        }
    }
    

    return(
        <div className="pageContainer">
            <div className="form">
                <h3 style={{ marginBottom: "20px", color: "#333", textAlign: "center"}}> 
                    Activity and Calories Burned Calculator 
                </h3>

                <select
                value={activity}
                onChange={(event) => {
                setActivity(event.target.value);
                }}
                className="input"
                >
                <option value="">Select Activity</option>
                <option value="Walking(slow)">Walking(slow)</option>
                <option value="Walking(fast)">Walking(fast)</option>
                <option value="Running(slow)">Running(slow)</option>
                <option value="Running(fast)">Running(fast)</option>
                <option value="Swimming(slow)">Swimming(slow)</option>
                <option value="Swimming(fast)">Swimming(fast)</option>
                <option value="Cycling(slow)">Cycling(slow)</option>
                <option value="Cycling(fast)">Cycling(fast)</option>
                <option value="Rowing(slow)">Rowing(slow)</option>
                <option value="Rowing(fast)">Rowing(fast)</option>
                <option value="Jogging">Jogging</option>
                <option value="Weight Training">Weight Training</option>
                
                </select>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <input
                    placeholder="Enter Time Taken"
                    className="input"
                    onChange={(event) => {
                    setTime(event.target.value);
                    }}
                    />

                    <select
                    value={timeUnit}
                    onChange={(event) => {
                    setTimeUnit(event.target.value);
                    }}
                    className="input"
                    >
                    <option value="">Select Unit</option>
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                    </select>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <input
                    placeholder="Enter Distance"
                    className="input"
                    onChange={(event) => {
                    setDistance(event.target.value);
                    }}
                    />

                    <select
                    value={distanceUnit}
                    onChange={(event) => {
                    setDistanceUnit(event.target.value);
                    }}
                    className="input"
                    >
                    <option value="">Select Unit</option>
                    <option value="Metres">Metres</option>
                    <option value="Kilometres">Kilometres</option>
                    <option value="Miles">Miles</option>
                    <option value="Laps">Laps</option>
                    </select>
                </div>
                <p style={{ color: "red" }}>{error}</p>

                <button onClick={validation} className="button"> Calculate </button>

                {showResult ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <h5 style={{ color: "black", marginTop: "20px" }}>Calories burned: {result} kcal</h5>
                    <DemoContainer components={["DesktopDateTimePicker"]}>
                    <DesktopDateTimePicker label="Enter Date and Time" value={value} onChange={(newValue) => setValue(newValue)} />
                    </DemoContainer>
                    <p style={{ color: "red" }}>{dateTimeError}</p>
                    </LocalizationProvider>
                ) : null}

                {showResult ? (
                        <button onClick={displayDateTime} className="button"> Add to Activity Log </button>
                    ) : null}

                {showResult ? (
                    <p style={{ color: "green", paddingTop: "10px" }}>{successMessage}</p>
                    ) : null}
            </div>
        </div>
    )
}
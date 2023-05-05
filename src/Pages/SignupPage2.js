import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/Pages.css"
import { auth, db } from "../firebase-config";
import {collection, doc, setDoc, updateDoc, Timestamp} from "firebase/firestore"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";

export default function SignupPage2() {
    const [weight, setWeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("");
    const [height, setHeight] = useState("");
    const [heightUnit, setHeightUnit] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [DOB, setDOB] = useState("");
    const usersCollectionRef = collection(db, 'Users');
    const navigate = useNavigate();

    const validation = () => {
        if(weight === "" || weightUnit === ""){
          setError("Please enter weight/select units");
          return;
        } if(height === "" || heightUnit === ""){
            setError("Please enter height/select units");
            return;
        } if(DOB === ""){
          setError("Please enter Date of Birth");
          return;
        } if(gender === ""){
          setError("Please select gender")
          return;
        }
        console.log("Done...")
        register();
    }

    const register = async () => {
        try {
          // create user document in firestore
          await updateDoc(doc(usersCollectionRef, auth.currentUser.uid), {
            weight: weight,
            weightUnit: weightUnit,
            height: height,
            heightUnit: heightUnit,
            DOB: Timestamp.fromDate(new Date(DOB)),
            gender: gender
          }); 
          navigate("/profile");
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            setError("Email is already in use");
          }else {
            setError("An error occurred while registering. Please try again later.");
          }
          console.log(error.message);
        }
      };

      return (
        <div className='pageContainer'>
          <div className='form'>
            <h3 style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}>Enter Personal Information</h3>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>Weight</p>
                <input
                    placeholder="Enter Weight..."
                    value={weight}
                    className='input'
                    onChange={(event) => {
                        setWeight(event.target.value);
                    }}
                />
                <select
                    value={weightUnit}
                    onChange={(event) => {
                    setWeightUnit(event.target.value);
                    }}
                    className='input'
                    >
                    <option value="">Select Unit</option>
                    <option value="kg">Kilograms(kg)</option>
                    <option value="lbs">Pounds(lbs)</option>
                    <option value="stones">Stones</option>
                </select>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>Height</p>
                <input
                    placeholder="Enter Height..."
                    value={height}
                    className='input'
                    onChange={(event) => {
                        setHeight(event.target.value);
                    }}
                />
                <select
                    value={heightUnit}
                    onChange={(event) => {
                    setHeightUnit(event.target.value);
                    }}
                    className='input'
                    >
                    <option value="">Select Unit</option>
                    <option value="cm">Centimetres(cm)</option>
                    <option value="m">Metres(m)</option>
                </select>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                <p style={{ marginRight: "10px" }}>Date of Birth</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                <DatePicker label="Enter DOB" value={DOB} onChange={(newValue) => setDOB(newValue)} />
                </DemoContainer>
                </LocalizationProvider>
                </div>
                
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>Gender</p>
                <select
                    value={gender}
                    onChange={(event) => {
                    setGender(event.target.value);
                    }}
                    className='input'
                    >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="femle">Female</option>
                </select>
                </div>

            <button className='button' onClick={validation}>
              Sign up
            </button>
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          </div>
        </div>
      );
}
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc} from "firebase/firestore"
import { auth, db} from "../firebase-config";
import { useNavigate } from "react-router-dom";
import CalculateBMR from "../Formulas/CalculateBMR";

export default function ProfilePage() {
    const [userID, setUserID] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [weight, setWeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("");
    const [height, setHeight] = useState("");
    const [heightUnit, setHeightUnit] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [BMR, setBMR] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        getData();
    }, [userID]);

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

    

    async function getData() {
        const docRef = doc(db, "Users", userID);            
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBMR(await CalculateBMR());
          setFirstName(docSnap.data().firstName);
          setLastName(docSnap.data().lastName);
          setWeight(docSnap.data().weight);
          setWeightUnit(docSnap.data().weightUnit)
          setHeight(docSnap.data().height);
          setHeightUnit(docSnap.data().heightUnit);
        } else {
          console.log("No such document!");
        }
    }

    const validation = () => {
        if(firstName === "" || lastName === ""){
            setError("Please enter first/last name");
            setSuccessMessage("");
            return;
        } if(weight === "" || height === ""){
            setError("Please enter weight/height")
            setSuccessMessage("");
            return;
        } if(isNaN(weight) || isNaN(height)){
            setError("Please enter a valid weight/height");
            setSuccessMessage("");
            return;
        } if(weightUnit === "" || heightUnit === ""){
            setError("Please select a weight/height unit");
            setSuccessMessage("");
            return;
        } else {
            setError("")
            updateDetails();
        }
    }

    const updateDetails = () => {
        async function res() {
        await updateDoc(doc(db, "Users", userID), {
            firstName: firstName,
            lastName: lastName,
            weight: weight,
            weightUnit: weightUnit,
            height: height,
            heightUnit: heightUnit
            });
        getData()
        console.log("User details updated")
        setError("")
        setSuccessMessage("Details successfully updated")
        }
        res()
    }

    return(
        <div className='pageContainer'>
            <div className='form'>
                <h3 className='formTitle'> Profile </h3>
                
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>First name</p>
                <input
                    placeholder="Enter First Name..."
                    defaultValue={firstName}
                    className='input'
                    onChange={(event) => {
                        setFirstName(event.target.value);
                    }}
                />
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>Last name</p>
                <input
                    placeholder="Enter Last Name..."
                    defaultValue={lastName}
                    className='input'
                    onChange={(event) => {
                        setLastName(event.target.value);
                    }}
                />
                </div>
               
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
                <p>Your BMR is: {BMR} kcal</p>
                <button onClick={validation} className='button'> Update </button>
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
                <p style={{ color: "green" }}>{successMessage}</p>
            </div>
        </div>

    )
}
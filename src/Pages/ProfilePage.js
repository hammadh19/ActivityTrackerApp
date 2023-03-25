import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc} from "firebase/firestore"
import { auth, db} from "../firebase-config";
import background from "../wallpaper.jpeg";

export default function ProfilePage() {
    const userID = auth.currentUser.uid;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    
    useEffect(() => {
        async function getData() {
            const docRef = doc(db, "Users", userID);            
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setFirstName(docSnap.data().firstName);
              setLastName(docSnap.data().lastName);
              setWeight(docSnap.data().weight);
              setHeight(docSnap.data().height);
              setAge(docSnap.data().age);
            } else {
              console.log("No such document!");
            }
          }
        getData();
    }, []);

    const updateDetails = () => {
        async function res() {
        await updateDoc(doc(db, "Users", userID), {
            weight: weight,
            height: height,
            age: age
            });
        console.log("User details updated")
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
                    placeholder={firstName}
                    className='input'
                />
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>Last name</p>
                <input
                    placeholder={lastName}
                    className='input'
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
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>Age</p>
                <input
                    placeholder="Enter Age..."
                    value={age}
                    className='input'
                    onChange={(event) => {
                        setAge(event.target.value);
                    }}
                />
                </div>
                
                <button onClick={updateDetails} className='button'> Update </button>
            </div>
        </div>

    )
}
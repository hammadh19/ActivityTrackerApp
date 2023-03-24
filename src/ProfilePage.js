import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc} from "firebase/firestore"
import { auth, db} from "./firebase-config";
import background from "./wallpaper.jpeg";

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
                <h3 style={{ marginBottom: "20px", color: "#333" }}> Profile </h3>
                
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>First name</p>
                <input
                    placeholder={firstName}
                    style={input}
                />
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>Last name</p>
                <input
                    placeholder={lastName}
                    style={input}
                />
                </div>
               
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "10px" }}>Weight</p>
                <input
                    placeholder="Enter Weight..."
                    value={weight}
                    style={input}
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
                    style={input}
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
                    style={input}
                    onChange={(event) => {
                        setAge(event.target.value);
                    }}
                />
                </div>
                
                <button onClick={updateDetails} style={button}> Update </button>
            </div>
        </div>

    )
}
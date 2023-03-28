import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc} from "firebase/firestore"
import { auth, db} from "../firebase-config";
import background from "../wallpaper.jpeg";

export default function ActivitiesPage() {
    const userID = auth.currentUser.uid;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    
    useEffect(() => {
        getActivities();
    }, []);

    async function getActivities() {
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

    const validation = () => {
        if(firstName === "" || lastName === ""){
            setError("Please enter first/last name")
        }
        if(weight === "" || height === "" || age === ""){
            setError("Please enter weight/height/age")
        }
        else{
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
                <h3 className='formTitle'> Activities </h3>
                
            </div>
        </div>

    )
}
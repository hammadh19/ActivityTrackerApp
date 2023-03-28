import { useState } from "react";
import validator from 'validator';
import { Link, useNavigate } from "react-router-dom";
import "../StyleSheets/Pages.css"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import {collection, doc, setDoc} from "firebase/firestore"

export default function SignupPage() {
    const [registerFirstName, setRegisterFirstName] = useState("");
    const [registerLastName, setRegisterLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const usersCollectionRef = collection(db, 'Users');
    const navigate = useNavigate();

    const registerValidation = () => {
      if(registerEmail === "" || registerPassword === "" || registerConfirmPassword === "" || registerFirstName === "" || registerLastName === ""){
        setError('Please fill in all fields');
        return;
      }
      if(!validator.isEmail(registerEmail)){
        setError("Email is Not Correct");
        return;
      }
      if(!validator.isStrongPassword(registerPassword)){
        setError('Password is not strong enough');
          return;
      }
      if(registerPassword !== registerConfirmPassword){
        setError("Passwords didn't match. Try again")
        return;
      }
      else{
        register();
      }
    }

    const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );
          console.log("Successfully created User");

          // create user document in firestore
          await setDoc(doc(usersCollectionRef, user.user.uid), {
            firstName: registerFirstName,
            lastName: registerLastName,
            email: registerEmail,
            userID: user.user.uid,
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
            <h3 style={{ marginBottom: "20px", color: "#333" }}>Create an account</h3>
            <input
              placeholder="First Name..."
              className='input'
              onChange={(event) => {
                setRegisterFirstName(event.target.value);
              }}
            />
            <input
              placeholder="Last Name..."
              className='input'
              onChange={(event) => {
                setRegisterLastName(event.target.value);
              }}
            />
            <input
              placeholder="Email..."
              className='input'
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              placeholder="Password..."
              className='input'
              type="password"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <input
              placeholder="Confirm Password..."
              className='input'
              type="password"
              onChange={(event) => {
                setRegisterConfirmPassword(event.target.value);
              }}
            />
            <button className='button' onClick={registerValidation}>
              Sign up
            </button>
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            <p> 
                    Already have an account?{" "}
                    <Link to={"/login"}>Log in</Link>
                </p>
          </div>
        </div>
      );
}
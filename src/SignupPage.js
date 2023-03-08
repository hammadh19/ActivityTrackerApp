import { useState } from "react";
import validator from 'validator';
import { Link, useNavigate } from "react-router-dom";
import background from "./wallpaper.jpeg";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase-config";
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
      if(registerEmail == "" || registerPassword == "" || registerConfirmPassword == "" || registerFirstName == "" || registerLastName == ""){
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
      if(registerPassword != registerConfirmPassword){
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

      const container = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f7f7f7",
        fontFamily: "Arial",
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      };
      
      const formContainer = {
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
      
      const inputStyles = {
        width: "100%",
        height: "40px",
        padding: "8px",
        borderRadius: "5px",
        border: "none",
        marginBottom: "20px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      };
      
      const buttonStyles = {
        background: "#2b70fe",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
      };

      return (
        <div style={container}>
          <div style={formContainer}>
            <h3 style={{ marginBottom: "20px", color: "#333" }}>Create an account</h3>
            <input
              placeholder="First Name..."
              style={inputStyles}
              onChange={(event) => {
                setRegisterFirstName(event.target.value);
              }}
            />
            <input
              placeholder="Last Name..."
              style={inputStyles}
              onChange={(event) => {
                setRegisterLastName(event.target.value);
              }}
            />
            <input
              placeholder="Email..."
              style={inputStyles}
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              placeholder="Password..."
              style={inputStyles}
              type="password"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <input
              placeholder="Confirm Password..."
              style={inputStyles}
              type="password"
              onChange={(event) => {
                setRegisterConfirmPassword(event.target.value);
              }}
            />
            <button style={buttonStyles} onClick={registerValidation}>
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
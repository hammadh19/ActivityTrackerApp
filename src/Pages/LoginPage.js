import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import "../StyleSheets/Pages.css"

export default function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginValidation = () => {
      if(loginEmail === "" || loginPassword === ""){
        setError('Please fill in all fields');
        return;
      }
      if(!validator.isEmail(loginEmail)){
        setError("Email is Not Correct");
        return;
      }
      else{
        login();
      }
    }

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          console.log("Sucessfully Logged in");
          navigate("/profile");
        } catch (error) {
          if(error.code === "auth/user-not-found"){
            setError("No account exists")
          } else{
            setError("Please try again")
          }
        }
      };

    return(
        <div className='pageContainer'>
            <div className='form'>
                <h3 style={{ marginBottom: "20px", color: "#333" }}> Login </h3>
                <input
                    placeholder="Email..."
                    className='input'
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    className='input'
                    type="password"
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />

                <button onClick={loginValidation} className='button'> Login</button>
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
                <p> 
                    Don't have an account?{" "}
                    <Link to={"/signup"}>Sign up</Link>
                </p>
            </div>
        </div>

    )
}
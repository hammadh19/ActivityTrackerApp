import { useState } from "react";
import { Link } from "react-router-dom";
import SignupPage from "./SignupPage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";

export default function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };

    return(
        <div className="Login Page">
            <div>
            <h3> Login </h3>
            <input
            placeholder="Email..."
            onChange={(event) => {
                setLoginEmail(event.target.value);
            }}
            />
            <input
            placeholder="Password..."
            onChange={(event) => {
                setLoginPassword(event.target.value);
            }}
            />

            <button onClick={login}> Login</button>
            <p> 
                Don't have an account?{" "}
                <Link to={SignupPage}>Sign up</Link>
            </p>
            </div>
      </div>

    )
}
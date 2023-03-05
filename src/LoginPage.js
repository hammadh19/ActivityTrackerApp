import { useState } from "react";
import { Link } from "react-router-dom";
import validator from 'validator';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import background from "./wallpaper.jpeg";

export default function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");

    const loginValidation = () => {
      if(loginEmail == "" || loginPassword == ""){
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
        } catch (error) {
          console.log(error.message);
        }
      };

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
        <div className="Login Page" style={container}>
            <div style={form}>
            <h1>FitnessPal</h1>
                <h3 style={{ marginBottom: "20px", color: "#333" }}> Login </h3>
                <input
                    placeholder="Email..."
                    style={input}
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    style={input}
                    type="password"
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />

                <button onClick={loginValidation} style={button}> Login</button>
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
                <p> 
                    Don't have an account?{" "}
                    <Link to={"/signup"}>Sign up</Link>
                </p>
            </div>
        </div>

    )
}
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Nav from 'react-bootstrap/Nav';

export default function SignOutButton() {
  const navigate = useNavigate();
  async function handleSignOut() {
    try {
      await signOut(auth);
      console.log("Successfully signed out");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
  );
}
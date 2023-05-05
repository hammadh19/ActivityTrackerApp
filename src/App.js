import './App.css';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import SignupPage2 from './Pages/SignupPage2';
import AboutPage from './Pages/AboutPage';
import HowToUsePage from './Pages/HowToUsePage';
import ProfilePage from './Pages/ProfilePage';
import CalculatorPage from './Pages/CalculatorPage';
import ActivitiesPage from './Pages/ActivitiesPage';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
import SignOutButton from './Components/SignOutButton';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>

      <Navbar className='color-nav' expand="lg" >
        <Container>
          <Navbar.Brand>FitnessPal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!loggedIn ? (
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/login" activeclassname="active">Login</Nav.Link>
                </Nav.Item>
              ) : null}
              {!loggedIn ? (
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/signup" activeclassname="active">Signup</Nav.Link>
                </Nav.Item>
              ) : null}
              {!loggedIn ? (
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/about" activeclassname="active">About Us</Nav.Link>
                </Nav.Item>
              ) : null}
              {loggedIn ? (
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/profile" activeclassname="active">Profile</Nav.Link>
                </Nav.Item>
              ) : null}
              {loggedIn ? (
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/calculator" activeclassname="active">Calculator</Nav.Link>
                </Nav.Item>
              ) : null}
              {loggedIn ? (
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/activities" activeclassname="active">Activities</Nav.Link>
                </Nav.Item>
              ) : null}
              {loggedIn ? (
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/howToUse" activeclassname="active">How To Use</Nav.Link>
                </Nav.Item>
              ) : null}

              {loggedIn ? (
                <Nav.Item>
                  <SignOutButton />
                </Nav.Item>
              ) : null}
            </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
      <Route path='/login' element={<LoginPage/>} />          
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/signup2' element={<SignupPage2 />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/howToUse' element={<HowToUsePage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/calculator' element={<CalculatorPage/>} />
      <Route path='/activities' element={<ActivitiesPage/>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

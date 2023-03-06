import './App.css';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>

      <Navbar bg="primary" variant='dark' expand="lg">
        <Container>
          <Navbar.Brand>FitnessPal</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Item>
                <Nav.Link as={NavLink} to="/login" activeClassName="active">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/signup" activeClassName="active">Signup</Nav.Link>
              </Nav.Item>
            </Nav>
        </Container>
      </Navbar>

      <Routes>
      <Route path='/login' element={<LoginPage/>} />          
      <Route path='/signup' element={<SignupPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

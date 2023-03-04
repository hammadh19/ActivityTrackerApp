import './App.css';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/login' element={<LoginPage/>} />          
      <Route path='/signup' element={<SignupPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    

  );
}

export default App;

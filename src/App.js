import './App.css';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginPage/>} />          
      <Route path='/' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
    

  );
}

export default App;

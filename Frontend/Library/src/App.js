import './style/App.css';
import SignUp from "./pages/Auth/register/SignUp";
import LogIn from "./pages/Auth/logIn/LogIn";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import  Header  from './shared/Header';
import  Footer  from './shared/Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './shared/Sidebar';


const Home = ()=>{
  return (
    <div className="App">
     
     <Header/>
     <Outlet/>
     <Sidebar></Sidebar>
      <Footer />

    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('auth')) || false
  );

  const setAuth = (value) => {
    setIsAuthenticated(value);
    //alert(value);
  };

  useEffect(()=>{
    localStorage.setItem("auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <>
     <Header/>
     <Outlet/>
     <Sidebar></Sidebar>
      <Footer />

     <Routes>
      
     <Route
     /*
       path="/"
       element={isAuthenticated
         ? Home
         : <Navigate to="/logIn" replace />
       }
       */
       />
       <Route //path="/logIn" element={<LogIn setAuth={setAuth} />}
        />
       <Route //path="/logIn/SingUp" element={<SignUp />} 
       />
       </Routes>
    </>
 

  );
}
export default Home;
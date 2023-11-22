import  Header  from './Header';
import  Footer  from './Footer';
import '../style/App.css'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import React, {useContext} from 'react';
import {AuthContext} from "../pages/Auth/logIn/AuthContext";

const  Homepage = ()  => {
  const authContext = useContext(AuthContext);

function logout(){
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    authContext.setAuth({});
}
return (
    <div className="App">
     
     <Header/>
     <Outlet/>
     <Sidebar></Sidebar>
      <Footer />

    </div>
  );
}
export default  Homepage;
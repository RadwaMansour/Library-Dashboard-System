import axios from "axios";
import './login.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { Alert } from "bootstrap";
import { getAuthUser, setAuthUser } from "../../../helper/Storage";

const LogIn =() => {
  const navigate = useNavigate();
  const auth= getAuthUser();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err:[],
  });
  
/*export default function LogIn({setAuth}) {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  function validateForm() {
    return values.email.length > 0 && values.password.length > 0;
  }
*/
  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({...login, loading: true, err:[]});
    axios.post('http://localhost:3000/auth/login', {
      email: login.email,
      password: login.password,
    }).then((resp) => {
      setLogin({...login, loading: false,success:"Login Successfully", err:[]});
      setAuthUser(resp.data);
      {auth.status ?alert("Login Successfully"):alert("Acount is not active yet !");}
      navigate("/");

    }).catch(err => {
      alert("Invaild password and email");
      console.log(err);
      setLogin({...login, loading: false,  err: "Invaild password and email"});

    });
  };

 /* const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
*/
 /* function LogIn() {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const found = users.some(user => user.email === values.email && user.password === values.password);
  
    if (found) {
      setAuth(found);
      navigate("/", { replace: true });
    } else {
      alert("Error email/password");
    }
  }
    
    const inputs=[
        
        {
            id:1,
            name:"email",
            type: "email",
            placeholder:"Enter Your  Email",
            errorMessage:"It should be a valid email address",
            label:"Email",
            required: true,
        },
        {
            id:2,
            name:"password",
            type: "text",
            placeholder:"Enter Your  Password",
            errorMessage:"Password should be 8-20 characters and it should at least contain 1 letter, 1 number, and 1 special character!",
            label:"password",
           // pattern:"^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]{8,20}",
            required: true,

        },
    ]
    */

    return(
       <div className='form-container'>
      <div className="container">
      <h2>Login</h2>
      {login.success ? (<alert variant="success" className="login-alert">
          {login.success}
        </alert>
      ):(<alert variant="danger" className="login-alert">
      {login.err}
    </alert>)
      }
         <form className="login-form" onSubmit={LoginFun}>
          
               <input type="email" placeholder="email" required value={login.email} onChange={(e) => setLogin({...login,email:e.target.value})} />
               <input type="password" placeholder="password" required value={login.password} onChange={(e) => setLogin({...login,password:e.target.value})} />
                <button type="submit"  /*onClick={LogIn}*/ className="buttonLogin" disabled={login.loading ===true}>LogIn</button>
  

             </form>
                <Link to="/logIn/SingUp" className="link-btn" >Don't have an account? SignUp</Link>
              </div>
              </div>
    )
};

export default LogIn;
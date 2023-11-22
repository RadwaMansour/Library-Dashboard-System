import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { Alert } from "bootstrap";
import { setAuthUser } from "../../../helper/Storage";


const SignUp = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    loading: false,
    err: [],
  });


  const SignUpFun = (e) => {
    e.preventDefault();
    setSignUp({ ...signUp, loading: true, err: [] });
    axios.post('http://localhost:3000/auth/register', {
      email: signUp.email,
      name: signUp.name,
      password: signUp.password,
      phone: signUp.phone,
      status: signUp.status,
      type: signUp.type,
    }).then((resp) => {
      alert("Register Successfully");
      setSignUp({ ...signUp, loading: false, err: [] });
      setAuthUser(resp.data);
      navigate("/");

    }).catch(errors => {
      alert("Something went wrong, please try again later !");
      console.log(errors);
      setSignUp({ ...signUp, loading: false, err: [] });

    });
  };

  return (
    <div className='form-container'>
      <div className="container">
        <h2>Sign Up</h2>
        {signUp.err.map((error, index) => (
          <alert key={index}> {error.msg}</alert>
        ))}
        <form className="signup-form" onSubmit={SignUpFun}>
          <input type="text" placeholder="Username" required value={signUp.name} onChange={(e) => setSignUp({ ...signUp, name: e.target.value })} />
          <input type="email" placeholder="Email" required value={signUp.email} onChange={(e) => setSignUp({ ...signUp, email: e.target.value })} />
          <input type="text" placeholder="Phone Number" required value={signUp.phone} onChange={(e) => setSignUp({ ...signUp, phone: e.target.value })} />
          <input type="password" placeholder="Password" required value={signUp.password} onChange={(e) => setSignUp({ ...signUp, password: e.target.value })} />
          <button type="submit" className="buttonLogin" disabled={signUp.loading === true}>SignUp</button>


        </form>

        <Link to="/logIn" className="link-btn">Already have an account? LogIn</Link>

      </div>
    </div>
  )
};

export default SignUp;
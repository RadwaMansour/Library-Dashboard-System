{/*
import React, { useState, useEffect } from "react";
import "./manageReaders.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";


const Button = () => {
  let {id} = useParams();
  const auth = getAuthUser();

    const [state, setState] = useState(false);
    const [user, setUser] = useState({
      status: '',
      loading: false,
      err: "",
      reload: false,
    });
    


  const handleClick = (e) => {
    e.preventDefault();
    setUser({ ...user, loading: true });

   // const formData = new FormData();
    //formData.append("status", user.status);
    axios
      .put('http://localhost:3000/users/' + id, {
        headers: {
          token: auth.token,
          "Content-Type": "application/json",

        },
      })
      .then((resp) => {
        setUser({ status:!user.status, reload: user.reload + 1 });
      })
      .catch(err => {
          setUser({...user,
             loading: false,
              err: "something went wrong, please try again later !"});
      });
  };
  let toggleClassCheck = state ? 'active' :null;

return(
    <button className={`btn${toggleClassCheck}`} onClick={handleClick}>
        {state ? 'Active' : 'Inactive'}
        {/*{state ? 'Active' && setUser(user.status==1) : 'Inactive' && setUser(user.status==0)}*/} 
       // </button>
//)
//};
//export default Button;

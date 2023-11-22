import React, { useState } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const AddUser = () => {
  const auth = getAuthUser();
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    status: "",
    type: "",
    err: "",
    loading: false,
    success: null,
  });


  const createUser = (e) => {
    e.preventDefault();

    setUser({ ...user, loading: true });

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("password", user.password);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("status", user.status);
    formData.append("type", user.type);
    axios
      .post("http://localhost:3000/users/create", formData, {
        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
      
      })
      .then((resp) => {
        //setAuthUser(resp.data);
        alert("user created successfully !");
        setUser({name: resp.data.name,
          email: resp.data.email,
          password: resp.data.password,
          phone: resp.data.phone,
          status: resp.data.status,
          type: resp.data.type, loading: false});

       
      })
      .catch((err) => {
        alert("Something went wrong, please try again later !");
        setUser({
          ...user,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={createUser} className="add">
      <h2 className="te">Add User</h2>
      {user.success ? (<alert variant="success" className="p-2">
          {user.success}
        </alert>
      ):(<alert variant="danger" className="p-2">
      {user.err}
    </alert>)
      }
          <input
            value={user.name||''}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="text"
            required
            placeholder="User Name"
            className="input"
          />
           <input
            value={user.password || ''}
            className="input"
            //value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            required
            placeholder="User Password"
          />

          <input
            value={user.email || ''}
            className="input"
            //value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            required
            placeholder="User Email"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={user.phone || ''}
            //value={user.phone}
            className="input"
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />

          <input
            type="text"
            placeholder="Status (inactive:0,active:1)"
           // value={user.status}
            value={user.status || ''}
            className="input"
            onChange={(e) => setUser({ ...user, status: e.target.value })}
          />
          <input
            type="text"
            placeholder="Type (user:0,admin:1)"
            value={user.type || ''}
            //value={user.type}
            onChange={(e) => setUser({ ...user, type: e.target.value })}
            className="input"
          />


        <button className="buttonadd" variant="primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddUser;

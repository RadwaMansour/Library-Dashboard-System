import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import { clear } from "@testing-library/user-event/dist/clear";

const UpdateUser = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
    type: '',
    err: "",
    loading: false,
    reload: false,
    success: null,
  });

  const updateUser = (e) => {
    e.preventDefault();

    setUser({ ...user, loading: true });

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("status", user.status);
    formData.append("type", user.type);
    axios
      .put("http://localhost:3000/users/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        alert("user updated successfully !");
        setUser({
          ...user,
          loading: false,
          success: "user updated successfully !",
          reload: user.reload + 1,
        });
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((resp) => {
        setUser({
          ...user,
          name: resp.data.name,
          email: resp.data.email,
          phone: resp.data.phone,
          status: resp.data.status,
          type: resp.data.type,
        });
      })
      .catch((err) => {
        setUser({
          ...user,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [user.reload]);

  return (
    <div className="add">
      <h1 className="te">Update User </h1>

      {user.success ? (<alert variant="success" className="p-2">
          {user.success}
        </alert>
      ):(<alert variant="danger" className="p-2">
      {user.err}
    </alert>)
      }
<form onSubmit={updateUser} >
      <div className="mb-3">
        <input
          type="text"
          placeholder="User Name"
          className="input"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>

      
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      
      <div className="mb-3">
        <input
          type="text"
          placeholder="Phone Number"
          className="input"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Status (inactive:0,active:1)"
          className="input"
          value={user.status}
          onChange={(e) => setUser({ ...user, status: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Type (user:0,admin:1)"
          className="input"
          value={user.type}
          onChange={(e) => setUser({ ...user, type: e.target.value })}
        />
      </div>

      <button className="buttonadd" variant="primary" type="submit">
        Update
      </button>
    </form>
    </div>
  );
};

export default UpdateUser;

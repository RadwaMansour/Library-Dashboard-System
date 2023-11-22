import React, { useState, useEffect } from "react";
import "./manageReaders.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";


const ManageReaders = () => {
  const auth = getAuthUser();
  const [search, setSearch] = useState("");
  //const [btnState, setBtnState] = useState(  {  status: '', } );


  const [readers, setReaders] = useState({
    status: '',
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });


  useEffect(() => {
    setReaders({ ...readers, loading: true });
    axios
      .get("http://localhost:3000/users", {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
        params: {
          search: search,
        },
      })
      .then((resp) => {
        setReaders({ ...readers, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setReaders({
          ...readers,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [readers.reload]);

  const handleClick = (id) => {
    //e.preventDefault();

    //setReaders({ ...readers, loading: true });

    //setBtnState(btnState => !btnState);
    setReaders({ ...readers, loading: true });

    // const formData = new FormData();
    //formData.append("status", user.status);
    axios
      .put('http://localhost:3000/users/status/' + id, {
        headers: {
          token: auth.token,
          "Content-Type": "application/json",

        },
      })
      .then((resp) => {
        setReaders({ status: !readers.status, reload: readers.reload + 1 });
      })
      .catch(err => {
        setReaders({
          ...readers,
          loading: false,
          err: "something went wrong, please try again later !"
        });
      });


  };
  const deleteUser = (id) => {
    axios
      .delete('http://localhost:3000/users/' + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setReaders({ ...readers, reload: readers.reload + 1 });
      })
      .catch(err => {
        setReaders({
          ...readers, loading: false, err: "something went wrong, please try again later !",
        });
      });
  };
  let toggleClassCheck = readers.status ? 'active' : null;

  const searchReaders = (e) => {
    e.preventDefault();
    searchReaders({ ...readers, reload: readers.reload + 1 });
  };

  return (

    <div className="app-container">
      {/* Loader  */}
      {readers.loading === true && (
        <div className="loader">
        </div>
      )}

      {/* Filter  */}
      <div className="manageReaders" onSubmit={searchReaders}>
        <h3 className="text">Manage Readers</h3>
        <Link to={"add"} className="btn">Add New Reader +</Link>
        <input type="text"
          placeholder="Search.."
          className="searchReader"
          value={search}
          onChange={event => setSearch(event.target.value)} />


      </div>

      <table className="tableReader">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {readers.results.filter((item) =>
            // note that I've incorporated the searchedVal length check here
            item.name.toLowerCase().includes(search)
            //keys.some((key) => item[key].toLowerCase().includes(query))
            //!query.length || row.toLowerCase().includes(query) 
          ).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.status ? 'Active' : 'Inactive'}
                {/*{state ? 'Active' && setUser(user.status==1) : 'Inactive' && setUser(user.status==0)}*/}
              </td>
              <td>
                <button onClick={(e) => { deleteUser(user.id) }} className="buttonreader">Delete</button>
                <Link to={"" + user.id} className="button">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReaders;
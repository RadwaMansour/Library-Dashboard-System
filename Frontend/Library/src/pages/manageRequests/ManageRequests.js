import React, { useState, useEffect } from "react";
import "./manageRequests.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";


const ManageRequests = () => {
  const auth = getAuthUser();
  const [search, setSearch] = useState("");

  const [request, setRequest] = useState({
    request: '',
    book_id: '',
    user_id: '',
    state: '',
    book_name: '',
    user_name: '',
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });


  useEffect(() => {
    setRequest({ ...request, loading: true });
    axios
      .get("http://localhost:3000/request/stat/" + 0, {
        params: {
          search: search,
        },
      })
      .then((resp) => {
        setRequest({ ...request, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setRequest({
          ...request,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [request.reload]);


  const acceptRequest = (id) => {
    // e.preventDefault();

    setRequest({ ...request, loading: true });

    const formData = new FormData();
    formData.append("request", request.request = 1);
    formData.append("book_id", request.book_id);
    formData.append("user_id", request.user_id);
    formData.append("state", request.state = 1);
    formData.append("user_name", request.user_name);
    formData.append("book_name", request.book_name);
    axios
      .put("http://localhost:3000/request/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setRequest({
          ...request,

          loading: false,
          success: "request added successfully !",
          reload: request.reload + 1,
        });
      })
      .catch((err) => {
        setRequest({
          ...request,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  const declineRequest = (id) => {
    // e.preventDefault();

    setRequest({ ...request, loading: true });

    const formData = new FormData();
    formData.append("request", request.request = 0);
    formData.append("book_id", request.book_id);
    formData.append("user_id", request.user_id);
    formData.append("state", request.state = 1);
    formData.append("user_name", request.user_name);
    formData.append("book_name", request.book_name);
    axios
      .put("http://localhost:3000/request/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setRequest({
          ...request,
          loading: false,
          success: "request added successfully !",
          reload: request.reload + 1,
        });
      })
      .catch((err) => {
        setRequest({
          ...request,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  const searchRequests = (e) => {
    e.preventDefault();
    searchRequests({ ...request, reload: request.reload + 1 });
  };

  return (

    <div className="app-container">
      {/* Loader  */}
      {request.loading === true && (
        <div className="loader">
        </div>
      )}
      <div className="manageReaders" onSubmit={searchRequests} >
        <h1 className="text2">Manage_Requests</h1>
        {/* <Link to={"add"} className="newRequest">Add New Request +</Link>*/}
        <input type="text"
          placeholder="Search.."
          className="searchRequest"
          value={search}
          onChange={event => setSearch(event.target.value)} />


      </div>

      <table className="tableRequest ">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Book Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {request.results.filter((item) =>
            // note that I've incorporated the searchedVal length check here
            item.user_name.toLowerCase().includes(search)
            //keys.some((key) => item[key].toLowerCase().includes(query))
            //!query.length || row.toLowerCase().includes(query) 
          ).map((request) => (

            <tr key={request.id}>
              <td>{request.user_name}</td>
              <td>{request.book_name}</td>
              <td>
                <button onClick={(e) => { acceptRequest(request.id) }} className="buttonRequest">Accept</button>
                <button onClick={(e) => { declineRequest(request.id) }} className="buttonRequest">Decline</button>
                <Link to={"user_request/" + request.user_id} className="button">History</Link>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ManageRequests;
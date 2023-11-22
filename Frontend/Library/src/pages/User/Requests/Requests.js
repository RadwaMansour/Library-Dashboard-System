import React, { useState, useEffect } from "react";
import "./requests.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";

const Requests = () => {
  const auth = getAuthUser();
  const [search, setSearch] = useState("");

  const [requests, setRequests] = useState({
    request: '',
    token: '',
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setRequests({
      ...requests,
      token: requests.token,
      //user_id: requests.user_id,
      loading: true
    });
    axios
      .get("http://localhost:3000/request/req/" + auth.token, {
        headers: {
          token: auth.token,
        },
        params: {
          search: search,
        },
      },)
      .then((resp) => {
        setRequests({ ...requests, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setRequests({
          ...requests,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [requests.reload]);

  const deleteRequest = (id) => {
    axios
      .delete('http://localhost:3000/request/' + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setRequests({ ...requests, reload: requests.reload + 1 });
      })
      .catch(err => {
        setRequests({
          ...requests, loading: false, err: "something went wrong, please try again later !",
        });
      });
  };

  const searchRequests = (e) => {
    e.preventDefault();
    searchRequests({ ...requests, reload: requests.reload + 1 });
  };
  return (
    <div className="app-container">
      {/* Loader  */}
      {requests.loading === true && (
        <div className="loader">
        </div>
      )}
      {/* Filter  */}
      <h2>Find Your Request</h2>
      <div onSubmit={searchRequests}>
        <input className="searchreq" type="text"
          onChange={event => setSearch(event.target.value)} />

      </div>

      <table className="tabRequest">
        <thead>
          <tr >
            <th>Name</th>
            <th>Request</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {requests.results.filter((item) =>
            //  search books' names
            item.book_name.toLowerCase().includes(search)

          ).map((request) => (
            <tr key={request.id}>
              <td>{request.book_name}</td>
              <td>
                {request.request && request.state ? "Accepted" : request.state ? 'Decline' : <button onClick={(e) => { deleteRequest(request.id) }} className="bdelete">Cancel Request</button>}
              </td>
              <td> {request.request && request.state ? <Link to={request.book_pdf}>PDF</Link> : request.state ? 'Decline' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
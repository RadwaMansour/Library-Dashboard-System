import React, { useState, useEffect } from "react";
import "./manageRequests.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";


const History = () => {
  const auth = getAuthUser();
  const [query, setQuery] = useState("");
  let { id } = useParams();
  const [request, setRequest] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });


  useEffect(() => {
    setRequest({ ...request, loading: true });
    axios
      .get("http://localhost:3000/request/" + id)
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
  


  return (
    
    <div className="history">


      <table className="tableRequest">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Book Name</th>
            <th>Request</th>
          </tr>
        </thead>
        
        <tbody>
          {request.results.map((request) => (
            
            <tr key={request.id}>
              <td>{request.user_name}</td>
              <td>{request.book_name}</td>
              <td>
              {request.request ? 'Accept' : request.state? 'Decline': 'Waiting'}
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
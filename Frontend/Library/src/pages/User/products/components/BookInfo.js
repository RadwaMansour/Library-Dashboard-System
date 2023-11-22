import React, { useState, useEffect } from "react";
import "./style/bookDetails.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { getAuthUser } from "../../../../helper/Storage";

const BookInfo = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [book, setBook] = useState({
    loading: true,
    result: [],
    err: null,
    reload: 0,
  });
  const [requests, setRequests] = useState({
    request: '',
    token: '',
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const [showButton, setShowButton] = useState(true);

  const [request, setRequest] = useState({
    request: "",
    results: [],
    loading: false,
    err: null,
  });

  useEffect(() => {
    setBook({ ...book, loading: true });
    axios
      .get("http://localhost:3000/books/" + id)
      .then((resp) => {
        setBook({ ...book, result: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setBook({
          ...book,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [book.reload]);



  const createRequest = (e) => {
    e.preventDefault();
    setRequest({ ...request, loading: true });

    axios
      .post('http://localhost:3000/request/create',
        {
          book_id: id,
          request: request.request = 1,
        },
        {
          headers: {
            token: auth.token,
          },
        })
      .then((resp) => {
        setRequest({ err: null, result: resp.data.request, loading: false });
        setBook({ ...book, reload: book.reload + 1 });
        setShowButton(false);

      })
      .catch((err) => {
        setRequest({
          ...request,
          loading: false,
          successMessage: null,
          err: "something went wrong, please try again later !",
        });
      });
  };


  const showRequest = (e) => {
    e.preventDefault();
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
  };

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

  return (
    <div className="book-info">
      {/* Loader  */}
      {book.loading === true && (
        <div className="loader">
        </div>
      )}
      {/* LIST BOOKS */}
      {book.loading === false && book.err == null && (
        <>
          {/* Details BOOK */}
          <div className="row">
            <div className="col-3">
              <img
                className="book-image"
                src={book.result.image_url}
                alt={book.result.name}
              />
            </div>

            <div className="col-9">
              <h1 className="h1request"> {book.result.name} </h1>
              <p className="prequest">{book.result.description}</p>
              {/* <Link to={book.result.pdf_url} className="btn">PDF</Link>*/}
            </div>
          </div>

          {/* Request For Books */}
          {auth && showButton && auth.type === 0 &&(
            <button onClick={createRequest} className="create-request">Request Status</button>

          )}
          {/* Handle Request  */}

          {auth && !showButton && auth.type === 0 &&(
            <><button className="create-request">Requested</button><button onClick={showRequest} className="create-request">Show Request Status</button>
           <table className="tblrequest">
          
           <tbody>
             {requests.results.map((request) => (
               <tr key={request.book_id}>
                {request.book_id == id ?
                <>
                 <td className="tdrequest">
                   {request.request && request.state ? "Accepted" : request.state ? 'Decline' : <button onClick={(e) => { deleteRequest(request.id) }} className="bdelete">Cancel Request</button>}
                 </td>
                 <td className="tdrequest"> {request.request && request.state ? <Link to={request.book_pdf} className="">PDF</Link> : request.state ? 'Decline' : 'Pending'}</td>
                 </>:null}
               </tr>
             ))}
           </tbody>
         </table>
         </>
          )}
          

        </>
      )}


    </div>
  );
};

export default BookInfo;

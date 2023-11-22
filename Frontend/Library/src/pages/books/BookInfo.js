import React, { useState, useEffect } from "react";
import "../style/bookList.css";
import ReviewMovie from "../../components/ReviewMovie";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";

const BookInfo = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [book, setBook] = useState({
    loading: true,
    result: null,
    err: null,
    reload: 0,
  });

  const [request, setRequest] = useState({
    request: "",
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

  const sendReqerst = (e) => {
    e.preventDefault();
    setRequest({ ...request, loading: true });
    axios
      .post(
        "http://localhost:3000/books/request",
        {
          book_id: id,
          request: request.request,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((resp) => {
        setRequest({ err: null, request: "", loading: false });
        setBook({ ...book, reload: book.reload + 1 });
      })
      .catch((errors) => {
        setRequest({ ...request, loading: false });
      });
  };

  return (
    <div className="">
      {/* Loader  */}
      {book.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* LIST BOOKS  */}
      {book.loading === false && book.err == null && (
        <>
          {/* Details BOOK  */}
          <div className="row">
            <div className="col-3">
              <img
                className="image"
                src={book.result.image_url}
                alt={book.result.name}
              />
            </div>

            <div className="col-9">
              <h3> {book.result.name} </h3>
              <p>{book.result.description}</p>
            </div>
          </div>

          {/* Request For BOOKS  */}
          <hr />
          <h5 className="text-center bg-dark text-white p-2">Request Book</h5>

          {book.result.requests.map((request) => (
            <ReviewMovie request={request.request} />
          ))}
          {/* Handle No Request  */}
          {book.result.requests.length === 0 && (
            <Alert variant="info" className="p-2">
              there is no request currently for this book
            </Alert>
          )}

          {auth && (
            <form onSubmit={sendReqerst}>
              <div className="mb-3">
                <textarea
                  value={request.request}
                  onChange={(e) =>
                    setReview({ ...request, request: e.target.value })
                  }
                  className="form-control"
                  placeholder="please write a request"
                  rows={5}></textarea>
              </div>

              <div className="mb-3">
                <button className="btn btn-dark">Send Request</button>
              </div>
            </form>
          )}
        </>
      )}

      {/* ERRORS HANDLING  */}
      {book.loading === false && book.err != null && (
        <Alert variant="danger" className="p-2">
          {book.err}
        </Alert>
      )}

      {!auth && (
        <Alert variant="warning" className="p-2">
          please login first to be able to send a request
        </Alert>
      )}
    </div>
  );
};

export default BookInfo;

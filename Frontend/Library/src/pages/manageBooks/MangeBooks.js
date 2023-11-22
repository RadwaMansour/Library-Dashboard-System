import React, { useState, useEffect } from "react";
import "./manageBooks.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import moment from 'moment'

const ManageBooks = () => {
  const auth = getAuthUser();
  const [search, setSearch] = useState("");

  const [books, setBooks] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setBooks({ ...books, loading: true });
    axios
      .get("http://localhost:3000/books", {
        params: {
          search: search,
        },
      })
      .then((resp) => {
        setBooks({ ...books, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setBooks({
          ...books,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [books.reload]);


  const deleteBook = (id) => {
    axios
      .delete('http://localhost:3000/books/' + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setBooks({ ...books, reload: books.reload + 1 });
      })
      .catch(err => {
        setBooks({
          ...books, loading: false, err: "something went wrong, please try again later !",
        });
      });
  };


  const searchBooks = (e) => {
    e.preventDefault();
    searchBooks({ ...books, reload: books.reload + 1 });
  };

  return (
    <div className="app-container" >
      {/* Loader  */}
      {books.loading === true && (
        <div className="loader">
        </div>
      )}
      {/* Filter  */}

      <div className="manageBooks" onSubmit={searchBooks}>
        <h3 className="text">Manage Books</h3>
        <Link to={"add"} className="btn">Add New Book +</Link>
        <input type="text"
          placeholder="Search.."
          className="searchBooks"
          value={search}
          onChange={event => setSearch(event.target.value)} />


      </div>

      <table className="tableBooks">
        <thead>
          <tr >
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>Field</th>
            <th>Publication Date</th>
            <th>PDF</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.results.filter((item) =>

            // note that I've incorporated the searchedVal length check here
            item.name.toLowerCase().includes(search)
            //keys.some((key) => item[key].toLowerCase().includes(query))
            //!query.length || row.toLowerCase().includes(query) 
          ).map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>
                <img
                  src={book.image_url}
                  alt={book.name}
                  className="img-avatar"
                />
              </td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.field}</td>
              <td>{moment(book.publication_date).format('DD/MM/YYYY')}</td>

              <td>
                <Link to={book.pdf_url} className="">PDF</Link></td>
              <td>
                <Link to={"/" + book.id} className="buttonbooks"> Show </Link>
                <button onClick={(e) => { deleteBook(book.id) }} className="buttonbooks"> Delete </button>
                <Link to={"" + book.id} className="buttonbooks">Update</Link>
                <Link to={"manageChapters/" + book.id} className="buttonbooks">Chapters</Link>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
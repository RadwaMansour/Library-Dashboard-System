import React, { useRef, useState } from "react";
import "./manageBooks.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const AddBook = () => {
  const auth = getAuthUser();
  const [book, setBook] = useState({
    name: '',
    author: '',
    field: '',
    publication_date: '',
    description: '',
    loading: false,
    err: '',
    successMessage: null,

  });


  const image_url = useRef(null);
  const pdf_url = useRef(null);

  const createBook = (e) => {
    e.preventDefault();

    setBook({ ...book, loading: true });

    const formData = new FormData();
    formData.append("name", book.name);
    formData.append("author", book.author);
    formData.append("field", book.field);
    formData.append("publication_date", book.publication_date);
    formData.append("description", book.description);
    if (image_url.current.files && image_url.current.files[0]) {
      formData.append("image", image_url.current.files[0]);
    }
    if (pdf_url.current.files && pdf_url.current.files[0]) {
      formData.append("image", pdf_url.current.files[0]);
    }
    axios
      .post('http://localhost:3000/books/create', formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setBook({
          name: resp.data.name,
          email: resp.data.email,
          password: resp.data.password,
          phone: resp.data.phone,
          publication_date: resp.data.publication_date,
          status: resp.data.status,
          type: resp.data.type,
          loading: false,
          err: null,
          successMessage: "Book created successfully !"
        });
        image_url.current.value = null;
        pdf_url.current.value = null;
      })
      .catch((err) => {
        setBook({
          ...book,
          loading: false,
          successMessage: null,
          err: "something went wrong, please try again later !",
        });
      });
  };

  return (
    <div>
      <form onSubmit={createBook} className="addbook">
        <h2 className="te">Add Book</h2>

      {book.successMessage ? (<alert variant="success" className="p-2">
          {book.successMessage}
        </alert>
      ):(<alert variant="danger" className="p-2">
      {book.err}
    </alert>)
      }
        <input
          type="file"
          name="image"
          required="required"
          placeholder="Link an image..."
          className="input"
          ref={image_url}
        />
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
          className="input"
          value={book.name||''}
          onChange={(e) => setBook({ ...book, name: e.target.value })}
        />
        <input
          type="text"
          name="author"
          required="required"
          placeholder="Enter the author..."
          className="input"
          value={book.author||''}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        /><input
          type="text"
          name="field"
          required="required"
          placeholder="Enter a field..."
          className="input"
          value={book.field||''}
          onChange={(e) => setBook({ ...book, field: e.target.value })}
        /><input
          type="text"
          name="publication_date"
          required="required"
          placeholder="Enter the publication_date..."
          className="input"
          value={book.publication_date||''}
          onChange={(e) => setBook({ ...book, publication_date: e.target.value })}
        />
        <textarea
          name="description"
          required="required"
          placeholder="Enter a description..."
          className="inputtext"
          value={book.description||''}
          onChange={(e) => setBook({ ...book, description: e.target.value })}
        ></textarea>
        <input
          type="file"
          name="pdf"
          required="required"
          placeholder="Link a pdf..."
          className="input"
          ref={pdf_url}
        />
        <button type="submit" className="buttonadd">Add</button>
      </form>
    </div>
  );
};
export default AddBook;
import React, { useEffect, useRef, useState } from "react";
import "./updateBook.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const UpdateBook = () => {
  const auth = getAuthUser();
  let { id } = useParams();
  const [book, setBook] = useState({
    name: '',
    author: '',
    field: '',
    publication_date: '',
    description: '',
    image_url: null,
    pdf_url: null,
    loading: false,
    err: "",
    reload: false,
  });


  const image = useRef(null);
  const pdf = useRef(null);


  const updateBook = (e) => {
    e.preventDefault();

    setBook({ ...book, loading: true });

    const formData = new FormData();
    formData.append("name", book.name);
    formData.append("author", book.author);
    formData.append("field", book.field);
    formData.append("publication_date", book.publication_date);
    formData.append("description", book.description);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    } if (pdf.current.files && pdf.current.files[0]) {
      formData.append("image", pdf.current.files[0]);
    }

    axios
      .put("http://localhost:3000/books/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setBook({
          ...book,
          image_url: resp.data.image_url,
          name: resp.data.name,
          author: resp.data.author,
          field: resp.data.field,
          publication_date: resp.data.publication_date,
          description: resp.data.description,
          pdf_url: resp.data.pdf_url,
          loading: false,
          successMessage: null,
          err: "Book updated successfully !",
          reload: book.reload + 1,
        });
      })
      .catch((err) => {
        setBook({
          ...book,
          loading: false,
          successMessage: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/books/" + id)
      .then((resp) => {
        setBook({
          ...book,
          name: resp.data.name,
          author: resp.data.author,
          field: resp.data.field,
          publication_date: resp.data.publication_date,
          description: resp.data.description,
          image_url: resp.data.image_url,
          pdf_url: resp.data.pdf_url,
        });

      })
      .catch((err) => {
        setBook({
          ...book,
          loading: false,
          successMessage: null,
          err: "something went wrong, please try again later !",
        });
      });
  }, [book.reload])

  return (
    <div className="update">
      <form onSubmit={updateBook} className="add">
        <h2 className="te">Update Book</h2>
  
        {book.successMessage ? (<alert variant="success" className="p-2">
          {book.successMessage}
        </alert>
      ):(<alert variant="danger" className="p-2">
      {book.err}
    </alert>)
      }

<img src={book.image_url} alt={book.name} className="image"/>
        <input
          type="file"
          name="image"
          className="input"
          ref={image}

        // onChange={(e) => setBook({ ...book, image_url: e.target.value })}
        />
        <input
          type="text"
          name="name"
          placeholder="Enter a name..."
          className="input"
          value={book.name}
          onChange={(e) => setBook({ ...book, name: e.target.value })}
        />
        <input
          type="text"
          name="author"
          placeholder="Enter the author..."
          className="input"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
        <input
          type="text"
          name="field"
          placeholder="Enter a field..."
          className="input"
          value={book.field}
          onChange={(e) => setBook({ ...book, field: e.target.value })}
        />
        <input
          type="text"
          name="publication_date"
          placeholder="Enter the publication_date..."
          className="input"
          value={book.publication_date}
          onChange={(e) => setBook({ ...book, publication_date: e.target.value })}
        />
        <textarea
          name="description"
          placeholder="Enter a description..."
          className="inputtext"
          value={book.description}
          onChange={(e) => setBook({ ...book, description: e.target.value })}
        >
        </textarea>
        <input
          type="file"
          name="Link pdf"
          className="input"
          ref={pdf}
        //onChange={(e) => setBook({ ...book, pdf_url: e.target.value })}
        />
        <button type="submit" className="buttonadd">Update</button>
      </form>
    </div>
  );
};
export default UpdateBook;
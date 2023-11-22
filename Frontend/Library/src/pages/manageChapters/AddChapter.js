import React, {  useState } from "react";
import "./manageChapters.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
//import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";

const AddChapter = () => {
  const {id} = useParams();
  const auth = getAuthUser();
  const [chapter, setChapter] = useState({
    book_id:'',
    title: '',
    description: '',
    loading: false,
    err: '',
    successMessage: null

  });


  const createChapter = (e) => {
    e.preventDefault();

    setChapter({ ...chapter, loading: true });

    const formData = new FormData();
    formData.append("title", chapter.title);
    formData.append("description", chapter.description);
    formData.append("book_id", id);
    axios
      .post('http://localhost:3000/chapters/create', formData, {
        book_id: id,
        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setChapter({
          book_id: id,
          title: resp.data.title,
          description: resp.data.description,
          loading: false,
          err: null,
          successMessage: "Chapter created successfully !"
        });
      })
      .catch((err) => {
        setChapter({
          ...chapter,
          loading: false,
          successMessage: null,
          err: "something went wrong, please try again later !",
        });
      });
  };

  return (
    <div>
      <form onSubmit={createChapter} className="add">
        <h2 className="te">Add Chapter</h2>
{/*{book.successMessage && (
          <Alert>{book.successMessage}</Alert>
        )}
        {book.err && (
          <Alert>{book.err}</Alert>
        )}*/}
       
        <input
          type="text"
          name="title"
          required="required"
          placeholder="Enter a title..."
          className="input"
          value={chapter.title}
          onChange={(e) => setChapter({ ...chapter, title: e.target.value })}
        />
        <textarea
          name="description"
          required="required"
          placeholder="Enter a description..."
          className="inputtext"
          value={chapter.description}
          onChange={(e) => setChapter({ ...chapter, description: e.target.value })}
        ></textarea>
         <button type="submit"  className="buttonadd">Add</button>
      </form>
    </div>
  );
};
export default AddChapter;
import React, { useEffect, useState } from "react";
import "./manageChapters.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const UpdateChapter = () => {
  const auth = getAuthUser();
  let {id} = useParams();
        const [chapter, setChapter] = useState({
          title: '',
          description: '',
          loading: false,
          err: "",
          reload: false,
        });


        const updateChapter = (e) => {
          e.preventDefault();

        setChapter({ ...chapter, loading: true });

        const formData = new FormData();
        formData.append("title", chapter.title);
        formData.append("description", chapter.description);

        axios
        .put("http://localhost:3000/chapters/" + id, formData, {
          headers: {
            token: auth.token,
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          setChapter({
            ...chapter,
            loading: false,
            successMessage: null,
            err: "Chapter updated successfully !",
            reload: chapter.reload + 1,
          });
        })
        .catch((err) => {
          setChapter({
            ...chapter,
            loading: false,
            successMessage: null,
            err: "Something went wrong, please try again later !",
          });
        });
    };
   
    useEffect(() => {
      axios
      .get("http://localhost:3000/chapters/" + id)
      .then((resp) => {
        setChapter({
          ...chapter,
          title: resp.data.title,
          description: resp.data.description,
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
    }, [chapter.reload])

        return(
            <div>
                <form onSubmit={updateChapter} className="add">
      <h2 className="te">Update Chapter</h2>
      {chapter.successMessage ? (<alert variant="success" className="p-2">
          {chapter.successMessage}
        </alert>
      ):(<alert variant="danger" className="p-2">
      {chapter.err}
    </alert>)
      }

        <input
          type="text"
          name="title"
          placeholder="Enter a title..."
          className="input"
          value={chapter.title}
          onChange={(e) => setChapter({ ...chapter, title:e.target.value })}
        />
        <textarea
          name="description"
          placeholder="Enter a description..."
          className="inputtext"
          value={chapter.description}
          onChange={(e) => setChapter({ ...chapter, description:e.target.value })}
        ></textarea>
        <button type="submit"  className="buttonadd">Update</button>
      </form>
            </div>
        );
      };  
export default UpdateChapter;
import React, { useState, useEffect } from "react";
import "./manageChapters.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";

const ManageChapters = () => {
  const auth = getAuthUser();
  const [search, setSearch] = useState("");

  let { id } = useParams();

  const [chapters, setChapters] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });


  useEffect(() => {
    setChapters({ ...chapters, loading: true });
    axios
      .get("http://localhost:3000/chapters/" + id, {
        params: {
          search: search,
        },
      })
      .then((resp) => {
        setChapters({ ...chapters, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setChapters({
          ...chapters,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [chapters.reload]);


  const deleteChapter = (id) => {
    axios
      .delete('http://localhost:3000/chapters/' + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setChapters({ ...chapters, reload: chapters.reload + 1 });
      })
      .catch(err => {
        setChapters({
          ...chapters, loading: false, err: "something went wrong, please try again later !",
        });
      });
  };

  const searchChapters = (e) => {
    e.preventDefault();
    searchChapters({ ...chapters, reload: chapters.reload + 1 });
  };

  return (
    <div className="app-container">
      {/* Loader  */}
      {chapters.loading === true && (
        <div className="loader">
        </div>
      )}

      {/* Filter  */}
      <div className="manageChapters" onSubmit={searchChapters}>
        <h3 className="text">Manage_Chapters</h3>
        <Link to={"/manageBooks/manageChapters/add/" + id} className="btn">Add New Chapter +</Link>
        <input type="text"
          placeholder="Search.."
          className="searchChapters"
          value={search}
          onChange={event => setSearch(event.target.value)} />

      </div>
      <table className="tabelChapters">
        <thead>
          <tr >
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {chapters.results.filter((item) =>
            // note that I've incorporated the searchedVal length check here
            item.title.toLowerCase().includes(search)
          ).map((chapter) => (
            <tr key={chapter.id}>
              <td>{chapter.id}</td>
              <td>{chapter.title}</td>
              <td>{chapter.description}</td>
              <td>
                <button onClick={(e) => { deleteChapter(chapter.id) }} className="buttondelete">Delete</button>
                <Link to={"/manageBooks/manageChapters/update/" + id} className="button">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageChapters;
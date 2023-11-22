import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import "../style/bookList.css";
import axios from "axios";
//import { Data } from "../../../core/data/Movies";


const BooksList = () => {
    const [query, setQuery] = useState("");

    const [books, setBooks] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    const [search, setSearch] = useState("");

    useEffect(() => {
        setBooks({ ...books, loading: true });
        axios
            .get("http://localhost:3000/books", {
                params: {
                    search: search,
                },
            })
            .then((resp) => {
                console.log(resp);
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

    const searchBooks = (e) => {
        e.preventDefault();
        searchBooks({ ...books, reload: books.reload + 1 });
    };

    return (
        <div >
            {/* Loader  */}
            {books.loading === true && (
                <div className="loader">
                </div>
            )}

            {/* Filter  */}
            <h2>Find Your Book</h2>
            <div onSubmit={searchBooks}>
                <input className="searchreq" type="text" placeholder="Enter Your Book Name"
                    onChange={event => setQuery(event.target.value)} />

            </div>
            <div className='book-list'>
                {
                    books.results.filter((item) =>
                        // search by name
                        item.name.toLowerCase().includes(query)
                    ).map((item) => {
                        return <BookCard
                            key={item.id}
                            name={item.name}
                            author={item.author}
                            desc={item.description}
                            id={item.id}
                            img={item.image_url} />;
                    })
                }
            </div>
        </div>
    );
};


export default BooksList;
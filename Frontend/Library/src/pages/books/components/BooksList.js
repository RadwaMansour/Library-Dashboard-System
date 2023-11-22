import { Data } from "../../../core/data/Books";
import BookCard from "./BookCard";
import "../style/bookList.css";
//import { Data } from "../../../core/data/Movies";


const BooksList = () => {
    const items = Data;
    const displayBooks = () => {
        return (
            <div className='book-list'>
                {
                    items.map((item) => {
                        return <BookCard
                            key={item.id}
                            name={item.name}
                            author={item.author}
                            desc={item.description}
                            id={item.id}
                            img={item.pdf} />;
                    })
                }

            </div>
        );
    };
    return <div>{
        <>
        <div>{displayBooks()}</div>
        </>
        }</div>

};

export default BooksList;
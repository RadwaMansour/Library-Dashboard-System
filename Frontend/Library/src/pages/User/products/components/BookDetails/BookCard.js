//import { click } from "@testing-library/user-event/dist/click";
import { Link } from "react-router-dom";
import "../style/bookCard.css";

const BookCard = (props) => {

    const moreInfo = () => {
        console.log('here we clicked on show more information');
    }
    return (
        <div className='book-card'>
            <div className="card-top">
                <img src={props.img} alt="book-card" />
            </div>
            <div className="card-info">
                <h4 className="title">{props.name}</h4>
                <h4 className="author">{props.author}</h4>
                <p className="info">{props.desc}</p>
                <button className="infobtn" onClick={moreInfo}>
                    <Link to={"/" + props.id}>
                        More Information
                    </Link>
                </button>
            </div>

        </div>
    )
};

export default BookCard;
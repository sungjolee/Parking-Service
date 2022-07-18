import "../css/MenuBar.css";
import {Link} from "react-router-dom";

export default function MenuBar() {
    return (
        <div>
            <button className="Search">
                <Link to={`/Search`}>Search</Link>
            </button>
            <button className="Home">
                <Link to={`/`}>Home</Link>
            </button>
            <button className="Parking">
                <Link to={`/Parking`}>Parking</Link>
            </button>
        </div>
    )
};

// style={{ textDecoration: 'none' }}
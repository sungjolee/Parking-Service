import styled from "styled-components";
import { Link } from "react-router-dom";

// const a = css`
//     text-decoration: none;
//     color: white;
// `

const Menubar = styled.div`
    position: fixed;
    bottom: 20px;
    display: flex;
    left: 50%;
    transform: translate(-50%, 0);
    align-items: center;
    justify-content: space-around;
    width: 280px;
    height: 50px;
    border-radius: 30px;
    background-color: lightgray;
    position: fixed;
`

const Home = styled.button`
    height: 40px;
    width: 80px;
    background-color: #4F4587;
    border-radius: 30px;
    border: 0;
    outline: 0;  
    margin: 3px;
    a:link {
    color : pink;
    }
    a:visited {
    color : lightblue;
    }
    a:hover {
    color : red;
    }
    a:active {
    color : green
    }
`

const Search = styled.button`
    height: 40px;
    width: 80px;
    background-color: #4F4587;
    border-radius: 30px;
    border: 0;
    outline: 0;  
    margin: 3px;
    a:link {
    color : pink;
    }
    a:visited {
    color : lightblue;
    }
    a:hover {
    color : red;
    }
    a:active {
    color : green
    }
`

const Parking = styled.button`
    height: 40px;
    width: 80px;
    background-color: #4F4587;
    border-radius: 30px;
    border: 0;
    outline: 0;  
    margin: 3px;
    a:link {
    color : pink;
    }
    a:visited {
    color : lightblue;
    }
    a:hover {
    color : red;
    }
    a:active {
    color : green
    }
`




export default function MenuBar() {
    return (
        <Menubar>
            <Search>
                <Link to={`/SearchPage`}>Search</Link>
            </Search>
            <Home>
                <Link to={`/`}>Home</Link>
            </Home>
            <Parking onClick={() => alert('선택한 주차장이 없습니다.')}>
                <Link to={`/SearchPage`}>Parking</Link>
            </Parking>
        </Menubar>
    )
};

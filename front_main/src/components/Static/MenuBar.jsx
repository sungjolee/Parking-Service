import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
`;

const Home = styled.button`
  height: 40px;
  width: 80px;
  background-color: #4f4587;
  border-radius: 30px;
  border: 0;
  outline: 0;
  margin: 3px;
  a:link {
    color: pink;
  }
  a:visited {
    color: lightblue;
  }
  a:hover {
    color: red;
  }
  a:active {
    color: green;
  }
`;

const Search = styled.button`
  height: 40px;
  width: 80px;
  background-color: #4f4587;
  border-radius: 30px;
  border: 0;
  outline: 0;
  margin: 3px;
  a:link {
    color: pink;
  }
  a:visited {
    color: lightblue;
  }
  a:hover {
    color: red;
  }
  a:active {
    color: green;
  }
`;

const Parking = styled.button`
  height: 40px;
  width: 80px;
  background-color: #4f4587;
  border-radius: 30px;
  border: 0;
  outline: 0;
  margin: 3px;
  a:link {
    color: pink;
  }
  a:visited {
    color: lightblue;
  }
  a:hover {
    color: red;
  }
  a:active {
    color: green;
  }
`;

export default function MenuBar() {
  const keyword = useSelector((state) => state.keyword.value);
  function warning() {
    if (keyword == []) {
      alert("주차장을 검색해 주세요.");
    }
  }

  return (
    <Menubar>
      <Search>
        <Link to={`/SearchPage`}>Search</Link>
      </Search>
      <Home>
        <Link to={`/`}>Home</Link>
      </Home>
      <Parking onClick={warning}>
        <Link to={keyword ? `/${keyword.PARKING}` : `/SearchPage`}>
          Parking
        </Link>
      </Parking>
    </Menubar>
  );
}

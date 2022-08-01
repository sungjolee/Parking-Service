import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getKeyword } from "../Redux/getSearchName";

const horizontalCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #c5a5f9;
  padding: 20px 60px;
  box-sizing: border-box;
`;

//Link태그의 스타일을 입히는거임(페이지이동하는 버튼)
//horizontalCenter 스타일 컴포넌트를 믹스인하여 속성값 전달
//홈으로 가기 위한 뒤로가기 버튼입니다
const ArrowIcon = styled(Link)`
  ${horizontalCenter}
  left: 18px;
  display: block;
  width: 21px;
  height: 18px;
  background-position: -164px -343px;
  vertical-align: top;
  background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
  background-size: 467px 442px;
  background-repeat: no-repeat;
`;


const SearchIcon = styled.span`
  ${horizontalCenter}
  right: 18px;
  width: 27px;
  height: 27px;
  background-size: cover;
  background-image: url("/images/searchIcon.png");
`;

//글자를 입력하면 RemoveIcon이 나오게 되고 누르면 input의 value값이 사라집니다
const RemoveIcon = styled.span`
  ${horizontalCenter}
  right: 8px;
  width: 20px;
  height: 20px;
  background-position: -389px -29px;
  display: inline-block;
  overflow: hidden;
  color: transparent;
  vertical-align: top;
  background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
  background-size: 467px 442px;
  background-repeat: no-repeat;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`q
  width: 100%;
  height: 30px;
  background-color: #fff;
  font-weight: 500;
  font-size: 15px;
  box-sizing: border-box;

  ${({ active }) =>
    active &&
    `
    padding-right: 25px; 
  `}
`;

const baseURL = "http://i7c103.p.ssafy.io:8000/totaldata/"; // 기본 url

export default function SearchBar({ onAddKeyword }) {
  // 1. 검색어를 state 로 다루도록 변경
  // 2. 이벤트 연결
  // 3. Link to 설명

  // redux
  const name = useSelector((state) => state.keyword.value);
  const dispatch = useDispatch();

  //form을 관련 요소를 다룰때는 2-way 데이터 바인딩을 해줍니다! (input 의 value에 state를 넣는 것)
  const [keyword, setKeyword] = useState("");

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  // 링크 이동을 위해 useNavigate 사용
  const navigate = useNavigate();
  const handleEnter = (e) => {
    if (keyword && e.keyCode === 13) {
      //엔터일때 부모의 addkeyword에 전달
      onAddKeyword(keyword);
      setKeyword("");
      console.log(e.keyCode);

      // Redux 실험중
      // dispatch(getKeyword(keyword));
      console.log("아래는 데이터베이스")
      console.log(datas)
      console.log("아래는 입력한 키워드")
      console.log(name);
      // 전체 데이터 확인
      let flag = 0
      for (const parkingData of datas) {
        if (keyword === parkingData.NAME) {
          dispatch(getKeyword(parkingData));
        } else{
          flag = flag + 1
        }
      }
      if (flag === datas.length) {
        // 검색 실패시
        alert("등록되지 않은 주차장입니다.")
        flag = 0
      } else {
        //검색 성공시
        navigate(`/`)
        flag = 0
        // window.location.href = "/";
      }
    }
  };


  const handleClearKeyword = () => {
    setKeyword("");
  };

  //느낌표로 키워드를 갖고있냐 없냐로 boolean 형태로 나옴
  //키워드를 가지고 있다면 active가 발생하여 padding이 발생함. // 패딩이 없으면 x 아이콘까지 글자가 침법하기 때문
  const hasKeyword = () => {
    if (!!keyword) {
      //keyword가 있으면 true, 없으면 false가 리턴이 되는 것을 확인 할 수 있습니다
      console.log(!!keyword);
    }
  };

  const [datas, setDatas] = useState([]); // useState를 통한 값 저장

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDatas(response.data);
    });
  }, []);

  return (
    <Container>
      <ArrowIcon to="/" />
      <InputContainer>
        <Input
          placeholder="주차장을 입력해주세요."
          active={hasKeyword}
          value={keyword}
          onChange={handleKeyword}
          onKeyDown={handleEnter}
        />
        {keyword && <RemoveIcon onClick={handleClearKeyword} />}
      </InputContainer>
      <SearchIcon />
    </Container>
  );
}

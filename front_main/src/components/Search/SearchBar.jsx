import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getKeyword } from "../Redux/getSearchName";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const horizontalCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #a6b0f7;
  padding: 20px 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

//홈으로 가기 위한 뒤로가기 버튼
const ArrowIcon = styled(Link)`
  ${horizontalCenter}
  left: 18px;
  width: 21px;
  height: 18px;
  background-position: -164px -343px;

  background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
  background-size: 467px 442px;
  background-repeat: no-repeat;
`;

const InputContainer = styled.div`
  position: relative;
  padding: 8px;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  margin-right: -45px;
`;

export default function SearchBar({ onAddKeyword, datas }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();

  // 검색어 자동완성에 사용할 이름 추출
  const parks = ["센트럴파크", "그린로드"];

  // flag2 : 검색 성공 여부 확인
  let flag = false;
  const [flag2, setFlag2] = useState(false);

  // enter 입력시 데이터 조회
  const handleEnter = (e) => {
    console.log("enter 잘 들어오나?");
    console.log(e);
    console.log(keyword);

    if (keyword && e.keyCode === 13) {
      //엔터일때 부모의 addkeyword에 전달
      onAddKeyword(keyword);
      setKeyword("");

      console.log("불러온 데이터베이스 ↓");
      console.log(datas);

      // 전체 데이터 확인
      let flag = 0;
      for (const parkingData of datas) {
        if (keyword === parkingData.NAME) {
          dispatch(getKeyword(parkingData));
        } else {
          flag = flag + 1;
        }
      }
      if (flag === datas.length) {
        // 검색 실패시
        alert("등록되지 않은 주차장입니다.");
        flag = 0;
      } else {
        //검색 성공시
        flag = 0;
        setFlag2(true);
      }
    }
  };

  // 클릭시 데이터 조회
  const handleClick = (e) => {
    console.log("Click 잘 들어오나?");
    console.log(keyword);

    console.log("불러온 데이터베이스 ↓");
    console.log(datas);

    // 전체 데이터 확인
    let flag = 0;
    for (const parkingData of datas) {
      if (keyword === parkingData.NAME) {
        dispatch(getKeyword(parkingData));
      } else {
        flag = flag + 1;
      }
    }
    if (flag === datas.length) {
      // 검색 실패시
      alert("등록되지 않은 주차장입니다.");
      flag = 0;
      if (keyword && true) {
        onAddKeyword(keyword); // 최근검색에 등록
        setKeyword("");
      }
    } else {
      //검색 성공시
      onAddKeyword(keyword); // 최근검색에 등록
      flag = 0;
      setFlag2(true);
    }
  };

  // 검색 성공시 지도 화면으로 이동시켜준다.
  // 링크 이동을 위해 useNavigate 사용
  useEffect(() => {
    // console.log(flag);
    if (flag2) {
      navigate(`/`);
    }
    // eslint-disable-next-line
  }, [flag, flag2]);

  return (
    <div>
      <Container>
        <ArrowIcon to="/" />
        <InputContainer>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={parks}
            onChange={(event, value) => setKeyword(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="주차장을 검색해 주세요."
                value={keyword}
                onChange={(newValue) => setKeyword(newValue.target.value)}
                onKeyDown={handleEnter}
              />
            )}
          />
        </InputContainer>
        <IconButton
          aria-label="search"
          sx={{ right: -50 }}
          value={keyword}
          onClick={handleClick}
        >
          <SearchIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Container>
    </div>
  );
}

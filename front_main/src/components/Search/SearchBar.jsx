import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
  background-size: 467px 442px;
  background-repeat: no-repeat;
`;
// vertical-align: top;

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

const Input = styled.input`
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

// border-radius: 0 0 1rem 1rem;
const DropDownContainer = styled.ul`
  position: absolute;
  width: 100%;
  background-color: #ffffff;
  display: block;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin-top: -1px;
  padding: 0.5rem 0;
  border: 1px solid rgb(223, 225, 229);

  z-index: 3;

  > li:hover {
    background-color: #d9d9d9;
  }

  > li {
    padding: 0 1rem;

    &.selected {
      background-color: #d9d9d9;
    }
  }
`;

export default function SearchBar({ onAddKeyword, datas }) {
  // 1. 검색어를 state 로 다루도록 변경
  // 2. 이벤트 연결
  // 3. Link to 설명

  // redux
  const dispatch = useDispatch();

  // 검색어 자동완성에 사용할 이름 추출
  const deselectedOptions = [
    "센트럴파크",
    "그린로드",
    "vinyl",
    "vintage",
    "refurbished",
    "신품",
    "빈티지",
    "중고A급",
    "중고B급",
    "골동품",
  ];

  //form을 관련 요소를 다룰때는 2-way 데이터 바인딩을 해줍니다! (input 의 value에 state를 넣는 것)

  const [keyword, setKeyword] = useState("");
  const [options, setOptions] = useState(deselectedOptions); //option의 상태는 input값을 포함하는 autocomplete 추천 항목 리스트를 확인하기 위함
  const [selected, setSelected] = useState(-1); //키보드로 option 선택할때 필요한 selected상태
  const [hasText, setHasText] = useState(false);
  const navigate = useNavigate();
  let flag = false;

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
    console.log(e.target.value);
  };

  const handleClearKeyword = () => {
    setKeyword("");
  };

  //느낌표로 키워드를 갖고있냐 없냐로 boolean 형태로 나옴
  //키워드를 가지고 있다면 active가 발생하여 padding이 발생함. // 패딩이 없으면 x 아이콘까지 글자가 침법하기 때문
  const hasKeyword = () => {
    if (!!keyword) {
      //keyword가 있으면 true, 없으면 false가 리턴이 되는 것을 확인 할 수 있다
    }
  };

  const handleDropDownClick = (clickedOption) => {
    // DropDown 컴포넌트의 li엘리먼트에서 onClick으로 이벤트 핸들러 함수에 option을 전달해주고 있다.
    setKeyword(clickedOption); //전달받은 option으로 inputValue를 변경해준다.

    // 클릭시 바로 지도로 이동
    for (const parkingData of datas) {
      console.log(clickedOption);
      // 검색 성공시
      if (clickedOption === parkingData.NAME) {
        flag = true;
        // 검색 기록에 추가해줌
        onAddKeyword(clickedOption);
        dispatch(getKeyword(parkingData));
        navigate(`/`);
        // function move() {
        //   return
        // }

        // (async function test1() {
        //   console.log("succes?");
        //   await move();
        // })();
      }
    }
  };

  // eslint-disable-next-line
  const handleKeyUp = (event) => {
    //option을 키보드로 선택할 수 있게해주는 핸들러 함수
    if (hasText) {
      //input에 값이 있을때
      if (event.key === "ArrowDown" && options.length - 1 > selected) {
        setSelected(selected + 1);
      }
      //options.length에 -1을 해주는 이유는 selected의 최대값을 맞춰주기 위해서이다.
      //예를들어 밑에 option이 2개가 나왔다고 가정했을 때, selected값이 최대 1까지 변할 수 있게 해줘야한다.
      //'ArrowDown'키를 누르면 selected는 0이 되고, 한번 더 누르면 1이 되고, 그 다음은 더이상 옵션이 없기 때문에 키가 안먹히게 해주는 것이다.

      if (event.key === "ArrowUp" && selected >= 0) {
        //처음 조건을 이해했다면 여기는 자연스럽게 이해될 것이다.
        setSelected(selected - 1);
      }
      if (event.key === "Enter" && selected >= 0) {
        //Enter키로 option 선택
        handleDropDownClick(options[selected]);
        setSelected(-1); //Enter키를 눌러서 선택이 되면 다시 selected는 -1이 되야한다.
      }
    }
  };

  // 검색어 자동완성 DropDown
  const DropDown = ({ options, handleComboBox, selected }) => {
    return (
      <DropDownContainer>
        {options.map((option, idx) => {
          return (
            <li
              key={idx}
              onClick={() => handleComboBox(option)}
              className={selected === idx ? "selected" : ""}
            >
              {option}
            </li>
          );
        })}
      </DropDownContainer>
    );
  };

  // flag2 : 검색 성공 여부 확인
  const [flag2, setFlag2] = useState(false);

  const handleEnter = (e) => {
    if (keyword && e.keyCode === 13) {
      //엔터일때 부모의 addkeyword에 전달
      onAddKeyword(keyword);
      console.log(onAddKeyword(keyword));

      setKeyword("");
      console.log(e.keyCode);

      console.log("불러온 데이터베이스 ↓");
      console.log(datas);
      console.log(deselectedOptions);
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
        // flag2 += 1
      }
    }
  };

  // 검색 성공시 지도 화면으로 이동시켜준다.
  // 링크 이동을 위해 useNavigate 사용

  useEffect(() => {
    console.log(flag);
    if (flag2) {
      navigate(`/`);
    }
    // eslint-disable-next-line
  }, [flag, flag2]);

  useEffect(() => {
    if (keyword === "") {
      //처음 렌더링 됐을 때의 상태와, input값을 모두 지워줬을 때
      setHasText(false); //input값의 유무상태를 false(없음)으로
      setOptions([]); //option은 빈배열로 만들어서 아래에 리스트가 나타나지 않도록 구현
    }

    if (keyword !== "") {
      //input값을 입력하면

      // deselectedOptions = datas.NAME
      // console.log(deselectedOptions)

      setOptions(
        deselectedOptions.filter((el) => {
          //입력된 값을 포함하는 option만 걸러준 상태로 변경한다.
          // console.log(el);
          // console.log(deselectedOptions.filter);

          return el.includes(keyword);
        })
      );
    }
    // eslint-disable-next-line
  }, [keyword]);

  return (
    <div>
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
          {keyword && (
            <DropDown
              options={options}
              handleComboBox={handleDropDownClick}
              selected={selected}
            />
          )}
        </InputContainer>
        <SearchIcon />
      </Container>
    </div>
  );
}

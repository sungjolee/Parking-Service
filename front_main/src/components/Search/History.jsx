import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { useDispatch } from "react-redux";
import { getKeyword } from '../Redux/getSearchName';



const HistoryContainer = styled.div`
  color: gray;
  padding: 18px;
`
const HeaderContainer = styled.div`
  overflow: hidden;
`
const Title = styled.span`
  float: left;
  font-weight: 500;
  color: #666;
`
const RemoveText = styled.span`
  float: right;
  color: #a7a7a7;
`

const ListContainer = styled.ul`
  margin: 10px 0;
`

//&는 자기 자신을 나타냄
//즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
const KeywordContainer = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const RemoveButton = styled.span`
  float: right;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-image: url("/images/clear.png");

`

const Keyword = styled.span`
  float: left;
  font-size: 16px;
  font-weight: 400;
  font-family: "NanumGothic-Bold";
`

function History({ keywords, onRemoveKeyword, onClearKeywords, datas }) {

  // const keyword = useSelector((state) => state.keyword.value);
  const dispatch = useDispatch();

  // flag2 : 검색 성공 여부 확인
  const [flag2, setFlag2] = useState(false);

  
  function handleClick(text) {
    console.log('History');
    console.log(datas);
    console.log(text)
    console.log(keywords)
    // 전체 데이터 확인

    // useEffect(() => {

    // }, [state])

    for (const parkingData of datas) {
      if (text === parkingData.NAME) {
        // console.log('어라 맞는데?')
        // console.log(datas)
        dispatch(getKeyword(parkingData));
        setFlag2((flag2) => !flag2)
      } 
      console.log(flag2);

    }
    if (flag2 === false) {
      // 검색 실패시
      // console.log('여기가 문제냐?');
      console.log(flag2);
      alert("등록되지 않은 주차장입니다.")


    //   if (text === parkingData.NAME) {
    //     // 검색 성공시
    //     console.log(parkingData.NAME);
    //     setFlag2(true)
    //     dispatch(getKeyword(parkingData))
    //   } else { 
    //   // 검색 실패시
    //   alert("등록되지 않은 주차장입니다.")
    // }
    }}



  // 검색 성공시 지도 화면으로 이동시켜준다.
  // 링크 이동을 위해 useNavigate 사용
  const navigate = useNavigate();
  useEffect(() => {
    if(flag2) {
      navigate(`/`)
    } 
  }, [flag2]);

  // useEffect(() => {
  // }, []);



  console.log('keyword', keywords)
  if (keywords.length === 0) {
    return <HistoryContainer>최근 검색된 기록이 없습니다.</HistoryContainer>
  }
  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText onClick={onClearKeywords}>전체삭제</RemoveText>
      </HeaderContainer>
      <ListContainer>
        {keywords.map(({ id, text }) => {
          return (
            <KeywordContainer key={id} onClick={() => handleClick(text)}>
              <Keyword>{text}</Keyword>
              <RemoveButton
                //눌렸을때 해야하는거라 arrow function을 사용하여 실행
                //그냥 함수 쓰면은 그려지자마자 바로 실행됨
                onClick={() => {
                  onRemoveKeyword(id)
                }}
              >
                
              </RemoveButton>
            </KeywordContainer>
          )
        })}
      </ListContainer>
    </HistoryContainer>
  )
}

export default History
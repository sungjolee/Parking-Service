import React from 'react';
import styled from 'styled-components'

const Box = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`
// transform: rotate(45deg); 주차장 기울이질 때 사용(숫자부분에 각도 넣기)

const Myzone = styled.button`
  background-color: white;
  color: black;
  border: 2px solid black;
`

export default function BoxClick() {
  // const changeRed = () => {
  //   return <Box>background-color: red</Box>
  // }
  
  // const alertParking = () => {
  //   return alert ('이미 주차된 자리입니다.')
  // }

  // const clickMe = ()=>{
  //   if (true) {
  //     return changeRed } 
  //   else { alertParking }}

  const clickMe = ()=>{
    alert ('이미 주차된 자리입니다.')
  }


  return (
    <Box onClick={clickMe}> 
      <Myzone>선택</Myzone>
    </Box>
  )
};

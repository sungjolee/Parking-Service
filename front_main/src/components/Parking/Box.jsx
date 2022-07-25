import React from 'react';
import styled from 'styled-components'

const Box = styled.button`
  border:1px solid red;
  width: 100px;
  height: 100px;
  transform: rotate(45deg);
`



export default function BoxClick() {
  const clickMe = ()=>{
    alert('이미 주차된 자리입니다.')
  }
  
  return (
    <Box onClick={clickMe}> 
      내 자리 표시하기
    </Box>
  )
};

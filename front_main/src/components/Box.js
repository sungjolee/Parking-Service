import React from 'react';
import "../css/Box.css";

export default function Box(props) {
  const clickMe = ()=>{
    alert('이미 주차된 자리입니다.')
  }
  
  return (
      <div className='box'>
        Box {props.name}
        <button onClick={clickMe}>내 자리 표시하기</button>
      </div>
  )
};

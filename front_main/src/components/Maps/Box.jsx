import styled from 'styled-components';
import React, { useState } from 'react';
import useLocalStorage from "./useLocalStorage";

const RedBox = styled.div`
  top : 30px;
  bottom : 100px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  font-weight: bold;
  color: black;
  float : left;
  text-align: center;
  background-color: #C5A5F9;
`
const GrayBox = styled.div`
  top : 30px;
  bottom : 100px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  font-weight: bold;
  color : black;
  float : left;
  justify-content : center;
  background-color: #D9D9D9;
`

export default function Box( { TestData } ) {
  const [zoneColor, setZoneColor] = useState(false)
  
  function MyParkingZone() {
    const [on, setOn] = useLocalStorage("on", false);
    if (on) {return setOn(true)}
  }

  function myZone(){
    setZoneColor(!zoneColor)
    // if (zoneColor) {
    //   setZoneColor(false)
    // } else {
    //   setZoneColor(true)
    // }
  }

  if (TestData.value === "OCCUPIED"){
    return (
      <RedBox onClick={() =>{ myZone(); }} style={{backgroundColor: zoneColor ? '#f34c4c' : '#C5A5F9'}}>{ TestData.ID }</RedBox>
    )
  } else if(TestData.value === "ENABLE") {
    return(
      <GrayBox onClick={myZone} style={{backgroundColor: zoneColor ? '#f34c4c' : '#D9D9D9'}}>{ TestData.ID }</GrayBox>
    )
  }}

// ////
//   function Counter() {
//     const [count, setCount] = useState(
//       () => JSON.parse(window.localStorage.getItem("count")) || 0
//     );
  
//     useEffect(() => {
//       window.localStorage.setItem("count", JSON.stringify(count));
//     }, [count]);
  
//     return <button onClick={() => setCount(count + 1)}>{count}</button>;
//   }

// myPosition ? setMyPosition(myPosition + 1) : setMyPosition(myPosition - 1));

// function MyParkingZone() {
//   const [myParkingZone, setMyParkingZone] = useLocalStorage("myParkingZone", false)
//   if (myParkingZone) {
//     setMyParkingZone(false)
//   } else {
//     setMyParkingZone(true)
//   }
// }

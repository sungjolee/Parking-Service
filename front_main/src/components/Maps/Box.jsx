import React, { useState } from "react";
import styled from 'styled-components'

const RedBox = styled.div`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  font-weight: bold;
  color: white;
  display: inline-block;
  text-align: center;
  /* background-color: #C5A5F9; */
`

const GrayBox = styled.div`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  font-weight: bold;
  display: inline-block;
  justify-content : center;
  background-color: #D9D9D9;
`

export default function Box( { data } ) {
  const [zoneColor, setZoneColor] = useState(false)

  function myZone(){
    if (zoneColor) {
      setZoneColor(false)
    } else {
      setZoneColor(true)
    }
  }

  if (data.value === 'OCCUPIED'){
    return (
      <RedBox onClick={myZone} style={{backgroundColor: zoneColor ? 'green' : '#C5A5F9'}}>{ data.ID }</RedBox>
    )
  } else if(data.value === 'ENABLE') {  
    return(
      <GrayBox onClick={myZone}>{ data.ID }</GrayBox>
    )
  }
}

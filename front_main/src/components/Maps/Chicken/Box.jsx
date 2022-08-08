import styled from 'styled-components'
import { useState } from 'react'

const RedBox = styled.div`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  font-weight: bold;
  color: white;
  float : left;
  text-align: center;
  background-color: #C5A5F9;
`
const GrayBox = styled.div`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  font-weight: bold;
  float : left;
  justify-content : center;
  background-color: #D9D9D9;
`

export default function Box( { TestData } ) {
  const [zoneColor, setZoneColor] = useState(false)

  function myZone(){
    if (zoneColor) {
      setZoneColor(false)
    } else {
      setZoneColor(true)
    }
  }

  if (TestData.value === "OCCUPIED"){
    return (
      <RedBox onClick={myZone} style={{backgroundColor: zoneColor ? 'green' : '#C5A5F9'}}>{ TestData.ID }</RedBox>
    )
  } else if(TestData.value === "ENABLE") {
    return(
      <GrayBox onClick={myZone} style={{backgroundColor: zoneColor ? 'green' : '#C5A5F9'}}>{ TestData.ID }</GrayBox>
    )
  }}

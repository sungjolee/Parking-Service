import styled from 'styled-components'

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
  if (TestData.value === "OCCUPIED"){
    return (
      <RedBox>{ TestData.ID }</RedBox>
    )
  } else if(TestData.value === "ENABLE") {
    return(
      <GrayBox>{ TestData.ID }</GrayBox>
    )
  }}

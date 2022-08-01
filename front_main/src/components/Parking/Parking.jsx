import styled from 'styled-components';
import { useState } from 'react';

const ParkingSatus = styled.h2`
  position: fixed;
  top : 0;
  left : 0;
  right : 0;
  align-items: center;
  font-size : 40px;
  background-color: #f7ccf7;
  color: #222222;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.2);
`

const BackParking = styled.div`
  width : 80vw;
  height: 100%;
  margin-left : auto;
  margin-right : auto;
  display: flex;
`

const Box1 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box2 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box3 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor}; 
`

const Box4 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box5 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box6 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box7 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box8 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box9 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box10 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box11 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
`

const Box12 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: ${props => props.bgColor};
  &.active {}
`

const Myzone = styled.button`
  margin-top : 60%;
  margin-bottom : 25%;
  margin-left:25%;
  margin-right:25%;  
  color: black;
  border: 1px solid black;
`

const Parking = ({ParkingData}) => {


  
  function CheckBox1(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's1') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox2(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's2') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox3(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's3') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox4(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's4') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox5(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's5') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox6(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's6') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox7(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's7') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox8(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's8') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox9(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's9') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox10(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's10') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox11(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    if(bgColor == "Green") return "Green"
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's11') {
          return "Red" } 
      };
    return "gray" 
  };

  function CheckBox12(ParkingData){
    let ocupiedarray = ParkingData?.OCUPIEDLIST
    if(bgColor == "Green") return "Green"
    for (let i=0; i < ocupiedarray?.length; i++){
        if (ocupiedarray[i] === 's12') {
          return "Red" } 
      };
    return "gray" 
  };

  const [bgColor, setBgColor] = useState('Red');

  const ClickMe = () => {
    console.log((bgColor === 'Red') && (bgColor === 'Gray'));
    (bgColor === 'Red') || (bgColor === 'Gray') ? setBgColor('Green') : setBgColor('Red');
  };

  // function ClickMe(){
  //   bgcolor === 'red' ? setBgColor('yellow') : setBgColor('red');
  // };

    return (      
        <div>
            <div>
              <ParkingSatus>
                빈 : {ParkingData.ENABLE} / 총 : {ParkingData.TOTAL} 
               </ParkingSatus>
             {/* 빈 주차공간 / 총 주차공간 표시 */}
            </div >
            <BackParking>
              <Box1 bgColor={CheckBox1(ParkingData)} onClick={ClickMe}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box1>
              <Box2 bgColor={CheckBox2(ParkingData)} onClick={ClickMe}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box2>
              <Box3 bgColor={CheckBox3(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box3>
              <Box4 bgColor={CheckBox4(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box4>
              <Box5 bgColor={CheckBox5(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box5>
              <Box6 bgColor={CheckBox6(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box6>
              <Box7 bgColor={CheckBox7(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box7>
            </BackParking>
            <BackParking>
              <Box8 bgColor={CheckBox8(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box8>
              <Box9 bgColor={CheckBox9(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box9>
              <Box10 bgColor={CheckBox10(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box10>
              <Box11 bgColor={CheckBox11(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box11>
              <Box12 bgColor={CheckBox12(ParkingData)}>
                  <Myzone bgColor = {bgColor} onClick={ClickMe}></Myzone>
              </Box12>
            </BackParking>
        </div>
    )
};

export default Parking
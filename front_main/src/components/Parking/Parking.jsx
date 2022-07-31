import styled from 'styled-components'

const ParkingSatus = styled.h2`
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
  background-color: gray;
`

const Box3 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray; 
`

const Box4 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray;
`

const Box5 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray;
`

const Box6 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray;
`

const Box7 = styled.div`
  float : left;
  margin-top : 100px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray;
`

const Box8 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray;
`

const Box9 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray;
`

const Box10 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray;
`

const Box11 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray;
`

const Box12 = styled.div`
  float : left;
  margin-top : 200px;
  margin-bottom : 150px;
  padding-left : 0px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  background-color: gray;
`

const Myzone = styled.button`
  margin-top : 60%;
  margin-bottom : 25%;
  margin-left:25%;
  margin-right:25%;  
  background-color: white;
  color: black;
  border: 2px solid black;
`




function checkBOX1({ParkingData}){

  let ocupiedarray = ParkingData?.OCUPIEDLIST
  for (let i=0; i<{ocupiedarray}.length;i++){
      if (ocupiedarray[i] === 's1') {
        return "Red"
      } else {return "Gray"}
  }
  console.log (ocupiedarray)
  let enablearray = ParkingData?.ENABLELIST
  for (let j=0; j<enablearray.length;j++){
      if (enablearray[j] === 's1') {
        return "Gray"
      }
  }
}

const clickMe = ()=>{  
  
  alert ('이미 주차된 자리입니다.')
  }

const Parking = ({ParkingData}) => {
    console.log(ParkingData)
    return (      
        <div>
            <div>
              <ParkingSatus>
                빈 : {ParkingData.ENABLE} / 총 : {ParkingData.TOTAL} 
               </ParkingSatus>
             {/* 빈 주차공간 / 총 주차공간 표시 */}
            </div >
            <BackParking>
              <Box1 onClick={clickMe} bgColor={checkBOX1(ParkingData)}>
                  <Myzone>클릭</Myzone>
              </Box1>
              {/* <Box1 onClick={clickMe} bgColor='red'>
                  <Myzone>클릭</Myzone>
              </Box1> */}
              <Box2 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box2>
              <Box3 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box3>
              <Box4 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box4>
              <Box5 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box5>
              <Box6 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box6>
              <Box7 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box7>
            </BackParking>
            <BackParking>
              <Box8 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box8>
              <Box9 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box9>
              <Box10 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box10>
              <Box11 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box11>
              <Box12 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box12>
            </BackParking>
        </div>
    )
};

export default Parking
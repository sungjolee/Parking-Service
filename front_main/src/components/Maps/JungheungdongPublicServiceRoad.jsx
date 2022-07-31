import styled from 'styled-components'

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
  background-color: gray;

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


const clickMe = ({datas})=>{  
  
  alert ('이미 주차된 자리입니다.')
  }

const Parking2 = ({datas}) => {

    return (
        <div>
            <div>
              <h2>
               빈 공간: {datas.ENABLE} / 총 공간: {datas.TOTAL} 
              </h2>
             {/* 빈 주차공간 / 총 주차공간 표시 */}
            </div >
            <BackParking>
              <Box1 onClick={clickMe}>
                  <Myzone>클릭</Myzone>
              </Box1>
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

export default Parking2
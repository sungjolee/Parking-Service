import styled from 'styled-components'

const Box1 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box2 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box3 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box4 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box5 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box6 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box7 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box8 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box9 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box10 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box11 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Box12 = styled.button`
  top : 30px;
  border:2px solid white;
  width: 100px;
  height: 150px;
  display: inline-block;
  background-color: gray;
`

const Myzone = styled.button`
  background-color: white;
  color: black;
  border: 2px solid black;
`

const emptySpotNow = ({datas}) => {}

const clickMe = ({datas})=>{  
  
  alert ('이미 주차된 자리입니다.')
  }

const Parking = ({datas}) => {
    return (
        <div>
            <div>
              ( {datas.ENABLE} / {datas.TOTAL} )
             {/* 빈 주차공간 / 총 주차공간 표시 */}
            </div >
            <div>
              {datas.ENABLELIST}
            </div>
                <ul>
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
                </ul> 
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            <ul>
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
            </ul>
        </div>
    )
};

export default Parking
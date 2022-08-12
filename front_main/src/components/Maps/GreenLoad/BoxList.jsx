import styled from 'styled-components';
import Box from '../Box'; // props를 위한 Box import

const ParkingSatus = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.2);
`

const Title = styled.div`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;

  color: white;
  font-size: 35px;
  font-weight: 500;
  background-color: #a6b0f7;
  border-radius: 50px;
`
const Info = styled.div`
  margin-top: 5px;
  font-size: 15px;
  font-weight: 500;
`
const AllParking = styled.div`
  flex-wrap : nowrap;
  @media screen and (max-width: 700px) {
        background-color: black;
    }
`
const BackParking = styled.div`
  width : 100%;
  height: 100%;
  margin-top : 200px;
  margin-left : 200px;
  margin-right : auto;
  margin-bottom : 100px;
  left : 200px;
  display: flex;
  
`

const BrTask = styled.div`
  margin-top : 300rem;
  margin-bottom: 300rem;
  `

// const CheckEnable = () => {
//   const CheckZone = EnableZone 
//   if (CheckZone === 0) {return '주차할 공간이 없습니다.'}
//    else {return '주차할 공간이 없습니다.'}
// }

const BoxList = ({ParkingData}) => {
  const EnableZone = ParkingData?.ENABLE
  
  const CheckEnable = (EnableZone) => {
    if (EnableZone === 0) {return '현재 주차할 공간이 없습니다.'}
     else {return '현재 주차할 공간이 없습니다.'}
  }

  const TestData = ParkingData?.LIST
  if (ParkingData) {return(
    <>
      <div>
        <ParkingSatus>
          <Title>{ParkingData.NAME}</Title>
          <Info>
          {CheckEnable(EnableZone)} <br />
          주차 현황 : {ParkingData?.ENABLE} / {ParkingData?.TOTAL}
          </Info>
          </ParkingSatus>
          <AllParking>
            <BackParking>
                {
                  TestData.filter(TestData => TestData.ID <= 7).map(TestData => (
                    <Box key={ TestData.ID } TestData={ TestData } />
                  ))
                }
            </BackParking>
            <BrTask></BrTask>
            <BackParking>
                {
                  TestData.filter(TestData => TestData.ID >= 8).map(TestData => (
                    <Box key={ TestData.ID } TestData={ TestData } />
                  ))
                }
            </BackParking>
          </AllParking>
      </div>
    </>
  )}
}
export default BoxList

import styled from 'styled-components';
import Box from '../Box'; // props를 위한 Box import

const ParkingSatus = styled.h4`
  position: flexd;
  /* top : 0;
  left : 0;
  right : 0;
  align-items: center;
  font-size : 40px;
  background-color: #f7ccf7;
  color: #222222;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.2); */
`
const ParkingTitle = styled.div`
  /* position: flexd; */
  margin-left:auto; 
  margin-right:auto;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 300px;
  background-color: red;
  border-radius: 30;
  /* left: 50%; */
  /* transform: translate(-50%, 0); */

`



const BackParking = styled.div`
  width : 80vw;
  height: 100%;
  margin-left : auto;
  margin-right : auto;
  margin-top : 0px;
  margin-bottom : 0px;
  display: flex;
`

const RotateBox = styled.div`
  transform: rotate(90deg);
  margin-top : 250px;
`
const RightBox = styled.div`
  display: flex;
  justify-content: space-between;
  top : 0px;
  margin-top : 50px;
  margin-left: auto;
  margin-bottom : 150px;
`

const BoxList = ({ParkingData}) => {
  
  const TestData = ParkingData?.LIST
  if (ParkingData) {return(
    <>
      <div>
      <ParkingSatus>
          <ParkingTitle>
          {ParkingData.NAME}
          </ParkingTitle>
           빈 : {ParkingData?.ENABLE} / 총 : {ParkingData?.TOTAL}
      </ParkingSatus>
        <BackParking>
          <RotateBox>
            {
              TestData.filter(TestData => TestData.ID <= 2).map(TestData => (
                <Box key={ TestData.ID } TestData={ TestData } />
              ))
            }
          </RotateBox>
        </BackParking>
        <BackParking>
          <RightBox>
            {
              TestData.filter(TestData => TestData.ID >= 3).map(TestData => (
                <Box key={ TestData.ID } TestData={ TestData } />
              ))
            }
          </RightBox>
        </BackParking>
      </div>
    </>
  )}
}
export default BoxList

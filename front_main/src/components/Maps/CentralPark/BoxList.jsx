import styled from 'styled-components';
import Box from '../Box'; // props를 위한 Box import

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
  margin-left : 0px;
  margin-right : 0px;
`
const AllParking = styled.div`
  flex-wrap : nowrap;
  right : 0px;
  flex : 1;
`


const BackParking = styled.div`
  width : 100%;
  height: 100%;
  left : 0px;
  right : 0px;
  margin-top : 0px;
  margin-left : 0px;
  margin-right : 0px;
  margin-bottom : 0px;
  display: flex;
`

const RotateBox = styled.div`
  display: flex;
  transform: rotate(90deg);
  left : 0px;
  justify-content: space-between;
  margin-top : 350px;
  margin-left : 0px;
  margin-right : auto;
`
const RightBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top : 150px;
  margin-left: auto;
  margin-right : 0px;
  margin-bottom : 150px;
`

const BoxList = ({ParkingData}) => {
  
  const TestData = ParkingData?.LIST
  if (ParkingData) {return(
    <>
      <div>
        <ParkingSatus>
           {ParkingData.NAME} <br />
           빈 : {ParkingData?.ENABLE} / 총 : {ParkingData?.TOTAL}
           </ParkingSatus>
           <AllParking>
            <BackParking>
              <RotateBox>
                {
                  TestData.filter(TestData => TestData.ID <= 4).map(TestData => (
                    <Box key={ TestData.ID } TestData={ TestData } />
                  ))
                }
              </RotateBox>
            </BackParking>
            <BackParking>
              <RightBox>
                {
                  TestData.filter(TestData => TestData.ID >= 5).map(TestData => (
                    <Box key={ TestData.ID } TestData={ TestData } />
                  ))
                }
              </RightBox>
            </BackParking>
          </AllParking>
      </div>
    </>
  )}
}
export default BoxList

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
`
const AllParking = styled.div`
  flex-wrap : nowrap;
`

const BackParking = styled.div`
  width : 100%;
  height: 100%;
  margin-top : 200px;
  margin-left : 200px;
  margin-right : auto;
  margin-bottom : 100px;
  display: flex;
`

const BrTask = styled.div`
  margin-top : 300px;
  margin-bottom: 300px;
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
              <div>
                {
                  TestData.filter(TestData => TestData.ID <= 7).map(TestData => (
                    <Box key={ TestData.ID } TestData={ TestData } />
                  ))
                }
              </div>
            </BackParking>
            <BrTask></BrTask>
            <BackParking>
              <div>
                {
                  TestData.filter(TestData => TestData.ID >= 8).map(TestData => (
                    <Box key={ TestData.ID } TestData={ TestData } />
                  ))
                }
              </div>
            </BackParking>
          </AllParking>
      </div>
    </>
  )}
}
export default BoxList

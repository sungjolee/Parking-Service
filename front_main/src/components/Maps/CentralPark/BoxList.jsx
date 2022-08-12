import styled from "styled-components";
import Box from "../Box"; // props를 위한 Box import

const ParkingSatus = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.2);
`;

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
`;

const Info = styled.div`
  margin-top: 5px;
  font-size: 15px;
  font-weight: 500;
`;

const AllParking = styled.div`
  flex-wrap: nowrap;
  right: 0px;
  flex: 1;
`;

const BackParking = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`;

const RotateBox = styled.div`
  display: flex;
  transform: rotate(90deg);
  justify-content: space-between;
  margin-top: 300px;
  margin-left: 10%;
  margin-right: auto;
  @media screen and (max-width: 700px) {
    margin-left: -20%;
  }
`;
const RightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  margin-left: 50%;
  transform: translate(-50%, 0);
  margin-right: 0px;
  margin-bottom: 150px;
`;

const BoxList = ({ ParkingData }) => {
  const TestData = ParkingData?.LIST;
  if (ParkingData) {
    return (
      <>
        <div>
          <ParkingSatus>
            <Title>{ParkingData.NAME}</Title>
            <Info>
              주차 현황 : {ParkingData?.ENABLE} / {ParkingData?.TOTAL}
            </Info>
          </ParkingSatus>
          <AllParking>
            <BackParking>
              <RotateBox>
                {TestData.filter((TestData) => TestData.ID <= 4).map(
                  (TestData) => (
                    <Box key={TestData.ID} TestData={TestData} />
                  )
                )}
              </RotateBox>
            </BackParking>
            <BackParking>
              <RightBox>
                {TestData.filter((TestData) => TestData.ID >= 5).map(
                  (TestData) => (
                    <Box key={TestData.ID} TestData={TestData} />
                  )
                )}
              </RightBox>
            </BackParking>
          </AllParking>
        </div>
      </>
    );
  }
};
export default BoxList;

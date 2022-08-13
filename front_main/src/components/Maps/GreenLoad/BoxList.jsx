import styled from "styled-components";
import Box from "../Box"; // props를 위한 Box import
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

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
  /* @media screen and (max-width: 700px) {
        background-color: black;
    } */
`;
const BackParking = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
  justify-content: center;
  align-items: center;
  display: flex;
  @media screen and (max-width: 700px) {
    margin-left: auto;
    margin-bottom: 20%;
  }
`;

// const BrTask = styled.div`
//   margin-top : 300rem;
//   margin-bottom: 300rem;
//   `

const BoxList = ({ ParkingData }) => {
  const EnableZone = ParkingData?.ENABLE;

  const CheckEnable = (EnableZone) => {
    if (EnableZone === 4) {
      return (
        <Stack sx={{ width: "100%" }} spacing={2} alignItems="center">
          <Alert variant="outlined" severity="warning">
            현재 주차 공간이 없습니다.
          </Alert>
        </Stack>
      );
    }
  };

  const TestData = ParkingData?.LIST;
  if (ParkingData) {
    return (
      <>
        <div>
          <ParkingSatus>
            <Title>{ParkingData.NAME}</Title>
            <Info>
              주차 현황 : {ParkingData?.ENABLE} / {ParkingData?.TOTAL}
              {CheckEnable(EnableZone)} <br />
            </Info>
          </ParkingSatus>
          <AllParking>
            <BackParking>
              {TestData.filter((TestData) => TestData.ID <= 3).map(
                (TestData) => (
                  <Box key={TestData.ID} TestData={TestData} />
                )
              )}
            </BackParking>
            <BackParking>
              {TestData.filter((TestData) => TestData.ID >= 4).map(
                (TestData) => (
                  <Box key={TestData.ID} TestData={TestData} />
                )
              )}
            </BackParking>
          </AllParking>
        </div>
      </>
    );
  }
};
export default BoxList;

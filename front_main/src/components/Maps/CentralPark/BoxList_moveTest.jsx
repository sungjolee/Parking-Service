import styled from "styled-components";
import Box from "../Box"; // props를 위한 Box import
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";

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
  /* flex-wrap: wrap; */
  /* align-content: space-between; */
  height: 100vh;
  width: 100vw;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  /* height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start; */
`;

const RotateBox = styled.div`
  display: flex;
  transform: rotate(90deg);
  /* left: 0px;
  justify-content: space-between;
  margin-top: 350px;
  margin-left: 0px;
  margin-right: auto; */
`;
const RightBox = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 150px;
  margin-right: 0;
  /* justify-content: space-between;
  margin-top: 150px;
  margin-left: auto;
  margin-right: 0px;
  margin-bottom: 15px; */
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
        </div>
        <TransformWrapper
          initialPositionX={0}
          initialPositionY={0}
          initialScale={1}
        >
          {({ zoomIn, zoomOut, ...rest }) => (
            <>
              <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
              </div>
              <TransformComponent>
                <AllParking>
                  <RotateBox>
                    {TestData.filter((TestData) => TestData.ID <= 4).map(
                      (TestData) => (
                        <Box key={TestData.ID} TestData={TestData} />
                      )
                    )}
                  </RotateBox>
                  <RightBox>
                    {TestData.filter((TestData) => TestData.ID >= 5).map(
                      (TestData) => (
                        <Box key={TestData.ID} TestData={TestData} />
                      )
                    )}
                  </RightBox>
                </AllParking>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </>
    );
  }
};
export default BoxList;

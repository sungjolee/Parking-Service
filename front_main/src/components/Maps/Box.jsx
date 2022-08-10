import styled from "styled-components";
import React, { useEffect, useState } from "react";

const RedBox = styled.div`
  top: 30px;
  bottom: 100px;
  border: 2px solid white;
  width: 100px;
  height: 150px;
  font-weight: bold;
  color: black;
  float: left;
  text-align: center;
  background-color: #c5a5f9;
`;
const GrayBox = styled.div`
  top: 30px;
  bottom: 100px;
  border: 2px solid white;
  width: 100px;
  height: 150px;
  font-weight: bold;
  color: black;
  float: left;
  justify-content: center;
  background-color: #d9d9d9;
`;

export default function Box({ TestData }) {
  const [zoneColor, setZoneColor] = useState(false);
  const [myPosition, setMyPosition] = useState(false);
  let number = TestData.ID;

  function myZone() {
    setZoneColor(!zoneColor);

    if (myPosition) {
      setMyPosition(!myPosition);
      window.localStorage.removeItem(number);
    } else {
      setMyPosition(!myPosition);
      // number index에 number을 저장한다.
      window.localStorage.setItem(number, number);
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem(number)) {
      myZone();
    }
  }, []);

  if (TestData.value === "OCCUPIED") {
    return (
      <RedBox
        onClick={() => {
          myZone();
        }}
        style={{ backgroundColor: zoneColor ? "#f34c4c" : "#C5A5F9" }}
      >
        {TestData.ID}
      </RedBox>
    );
  } else if (TestData.value === "ENABLE") {
    return (
      <GrayBox
        onClick={myZone}
        style={{ backgroundColor: zoneColor ? "#f34c4c" : "#D9D9D9" }}
      >
        {TestData.ID}
      </GrayBox>
    );
  }
}

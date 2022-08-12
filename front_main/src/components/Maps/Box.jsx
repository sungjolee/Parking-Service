import styled from "styled-components";
import React, { useEffect, useState } from "react";

const RedBox = styled.div`
  /* top: 30px;
  bottom: 100px; */
  border: 2px solid white;
  width: 60px;
  height: 100px;
  font-weight: bold;
  color: black;
  float: left;
  text-align: center;
  background-color: #f56060;
  border-radius: 10px;
`;
// #c5a5f9
// #d9d9d9
const GrayBox = styled.div`
  /* top: 30px;
  bottom: 100px; */
  border: 2px solid white;
  width: 60px;
  height: 100px;
  font-weight: bold;
  color: black;
  float: left;
  justify-content: center;
  background-color: #d9d9d9;
  border-radius: 10px;
`;

export default function Box({ TestData }) {
  const [zoneColor, setZoneColor] = useState(false);
  const [myPosition, setMyPosition] = useState(false);
  let number = TestData.ID;

  function myZone() {
    setZoneColor(!zoneColor);

    if (myPosition) {
      setMyPosition(!myPosition);
      // number을 삭제시킨다.
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
    // eslint-disable-next-line
  }, []);

  if (TestData.value === "OCUPIED") {
    return (
      <RedBox
        onClick={() => {
          myZone();
        }}
        style={{ backgroundColor: zoneColor ? "#5380E0" : "#f56060" }}
      >
        {TestData.ID}
      </RedBox>
    );
  } else if (TestData.value === "ENABLE") {
    return (
      <GrayBox
        onClick={myZone}
        style={{ backgroundColor: zoneColor ? "#5380E0" : "#D9D9D9" }}
      >
        {TestData.ID}
      </GrayBox>
    );
  }
}

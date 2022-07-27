import React, { useState,useEffect } from "react";
import axios from 'axios';

const baseUrl = 'https://3.34.176.114:8000/review'

export default function Parking_data() {
  const [parkingData, setParkingData] = useState(null)

  const fetchData = async () => {
    const response = await axios.get(baseUrl)
    setParkingData(response.data);
    };


  useEffect(() => {
    axios.get(baseUrl)
         .then(response => setParkingData(response.data))
    // 위와 같은코드
    // axios({
    //   method:'GET',
    //   url:'baseUrl',
    // }).then(response => setParkingData(response.data))
  });

  // 위의 useEffect()와 같은 코드
  // useEffect(() => {
  //   fetchData
  // }, []);
  
  const parkingInfor = async (e) => {
    e.preventDefault();
    const parkingName = e.target.parkingName.value;
    await axios.post(baseUrl, { parkingName });
    fetchData();
  };

  return (
    <div className='api'>
      <h1>주차장 정보 출력</h1>
      <form onSubmit={parkingInfor}>
        {parkingData.map((parking) => {
          <div key={parking.ID}>
            <div>주차장 No : {parking.ID}</div>
            <div>{parking.emptySpotNow} / {parking.totalSpot}</div>
            <div>{parking.emptySpotList}</div>
          </div>
        })}
      </form>
    </div>
  );
};

// api 정보(확정x)
// "ID"
// "TIME"
// "emptySpotNow"
// "totalSpot"
// "emptySpotList" : ["s5", "s9"]
// "parkingName"
import React, { useState,useEffect } from "react";
import axios from 'axios';

const back_url = 'https://3.34.176.114:8000/review'

export default function Parking_data() {
  const [parkingData, setParkingData] = useState(null)

  const fetchData = async () => {
    const response = await axios.get(back_url)
    setParkingData(response.data);
    };


  useEffect(() => {
    // 아래와 같은 코드
    // axios.get(back_url)
    //      .then(response => setParkingData(response.data))
    axios({
      method:'GET',
      url:'back_url',
    }).then(response => setParkingData(response.data))
  });

  // 위의 useEffect()와 같은 코드
  // useEffect(() => {
  //   fetchData
  // }, []);
  
  const parkingInfor = async (e) => {
    e.preventDefault();
    const parkingName = e.target.parkingName.value;
    await axios.post(back_url, { parkingName });
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
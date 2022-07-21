import React, { useState,useEffect } from "react";
import axios from 'axios';

const back_url = 'http://localhost:3000/review'

export default function Parking_data() {
  const [parkingList, setParkingData] = useState(null)

  const fetchData = async () => {
    const response = await axios.get(back_url)
    setParkingData(response.data);
    }
  };

  useEffect(() => {
    // axios.get(back_url)
    //      .then(response => setParkingData(response.data))
    
    axios({
      method:'GET',
      url:'back_url',
    }).then(response => setParkingData(response.data))
  })

  useEffect(() => {
    fetchData
  }, []);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const ID = e.target.ID.value;
    const TIME = e.target.TIME.value;
    const emptySpot = e.target.emptySpot.value;
    const totalSpot = e.target.totalSpot.value;
    const emptySpotList = e.target.emptySpotList.value;
    await axios.post(back_url, { ID, TIME, emptySpot, totalSpot, emptySpotList });
    fetchData();
  }

  return (
  <div className='api'>
    <h1>주차장 정보 출력</h1>

    {parkingList.map((parking) => {
      <div key={parking.ID}>
        <div>주차장 No : {parking.ID}</div>
        <div>{parking.emptySpotNow} / {parking.totalSpot}</div>
        <div>{parking.emptySpotList}</div>
      </div>
    })}
    </div>
  );


// api 정보(확정x)
// "ID"
// "TIME"
// "emptySpotNow"
// "totalSpot"
// "emptySpotList" : ["s5", "s9"] 
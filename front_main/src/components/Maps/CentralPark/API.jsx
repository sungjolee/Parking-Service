import BoxList from './BoxList' // props를 위한 BoxList import
import React, { useState, useEffect } from 'react';
import axios from 'axios'

// BASE_URL parking 유동적으로 바꿔야함
const BASE_URL = 'http://i7c103.p.ssafy.io:8000/parking/'


export default function CentralPark() {
  const [ParkingData, setParkingData] = useState();

  useEffect(() => {
    axios.get(BASE_URL).then((response) => {
      setParkingData(response.data);
      console.log(ParkingData)
    });
  }, []);

  return(
    // <div>여긴 centralpark API</div>
    < BoxList ParkingData={ParkingData}/>
  )
}




import Box from './Box' // props를 위한 BoxList import
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const BASE_URL = 'http://i7c103.p.ssafy.io:8000/parking'
const [ParkingData, setParkingData] = useState({}); // useState를 통한 datas 값 저장



export default function CentralPark() {
  useEffect(() => {
  // 재사용을 위한 함수 선언
  const getParkingData = async() => {
    const response = await axios.get(BASE_URL);
    setParkingData(response.data)
  }
  }, [])

  return(
    <div></div>
  )
}


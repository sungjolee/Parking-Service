import React, {useState, useEffect} from 'react';
import axios from 'axios'
import BoxList from './BoxList' // props를 위한 BoxList import


const BASE_URL = 'http://i7c103.p.ssafy.io:8000/parking/' // 기본 url


const ParkingData = () => {
  const [ParkingData, setParkingData] = useState(); // useState를 통한 datas 값 저장

  // useEffect 안 함수 작동
  useEffect(() => {
    axios.get(BASE_URL, {
      params: {ID : 'centralpark'}
    }).then((response) => {
      setParkingData(response.data);
      console.log(response)
    });
  }, []);

  return (
    <>
    <BoxList ParkingData={ParkingData}/>
    </>
  )
}

export default ParkingData

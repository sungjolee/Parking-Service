import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Parking from './Parking' // props를 위한 Parking import
import Parking2 from '../Maps/JungheungdongPublicServiceRoad'

const baseURL = 'http://i7c103.p.ssafy.io:8000/review/' // 기본 url


const ParkingData = () => {
  const [ParkingData, setParkingData] = useState({}); // useState를 통한 datas 값 저장

  // 재사용을 위한 함수 선언
  const getParkingData = async() => {
    const response = await axios.get(baseURL);
    setParkingData(response.data)
  }


  // useEffect 안 함수 작동
  useEffect(() => {
    getParkingData()
  }, [])

  return (
    <>
    {!!(ParkingData) ? (
      <>
    < Parking ParkingData={ParkingData}/>
    {/* < Parking2 ParkingData={ParkingData}/> */}
      {/* Parking.jsx에 props를 하기 위한 코드 작성(부모 자식 사이) */}
      <div>
      </div></>) 
      : (<></>)}
    </>
  )
}

export default ParkingData
// api 정보(확정X)
// "TIME": "2022-07-25T06:13:12",
// "SERIAL_ID": "idsample",
// "ENABLE": 5,
// "OCUPIEDLIST": "[1,3,5,7,9]",
// "TOTAL": 10,
// "ENABLELIST": "[2,4,6,8,10]"

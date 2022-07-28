// import React, { useState,useEffect } from "react";
// import axios from 'axios';

// const baseUrl = 'http://i7c103.p.ssafy.io:8000/review/'

// export default function Parking_data() {
//   const [parkingData, setParkingData] = useState(null)

//   const fetchData = async () => {
//     const response = await axios.get(baseUrl)
//     setParkingData(response.data);
//     console.log(response);
//     };


//   useEffect(() => {
//     axios.get(baseUrl)
//          .then(response => setParkingData(response.data))
//     // 위와 같은코드
//     // axios({
//     //   method:'GET',
//     //   url:'baseUrl',
//     // }).then(response => setParkingData(response.data))
//   });

//   // 위의 useEffect()와 같은 코드
//   // useEffect(() => {
//   //   fetchData
//   // }, []);
  
//   // const parkingInfor = async (e) => {
//   //   e.preventDefault();
//   //   const parkingName = e.target.parkingName.value;
//   //   await axios.post(baseUrl, { parkingName });
//   //   fetchData();
//   // };

//   return (
//     <div className='api'>
//       <h1>주차장 정보 출력</h1>
//       <form onSubmit={parkingInfor}>
//         {parkingData.map((parking) => {
//           <div key={respons.id}>
//             <div>주차장 No : {parking.ID}</div>
//             <div>{parking.emptySpotNow} / {parking.totalSpot}</div>
//             <div>{parking.emptySpotList}</div>
//           </div>
//         })}
//       </form>
//     </div>
//   );
// };

// 해당 방식으로 사용 하였을 때 cosloe.log에 Backend에 있는 데이터가 찍힌다.
import Parking from './Parking'

export default async function FetchMyPage() {
  const response = await fetch("http://i7c103.p.ssafy.io:8000/review/")
  const json = await response.json();
  console.log(json)
  console.log(json.ENABLE)
  return json 
}

// api 정보(확정X)
// "TIME": "2022-07-25T06:13:12",
// "SERIAL_ID": "idsample",
// "ENABLE": 5,
// "OCUPIEDLIST": "[1,3,5,7,9]",
// "TOTAL": 10,
// "ENABLELIST": "[2,4,6,8,10]"
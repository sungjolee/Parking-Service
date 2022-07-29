import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Parking from './Parking' // props를 위한 Parking import

const baseURL = 'http://i7c103.p.ssafy.io:8000/review/' // 기본 url


const Datas = () => {
  const [datas, setDatas] = useState({}); // useState를 통한 datas 값 저장

  // 재사용을 위한 함수 선언
  const getDatas = async() => {
    const response = await axios.get(baseURL);
    setDatas(response.data)
  }

  // useEffect 안 함수 작동
  useEffect(() => {
    getDatas()
  }, [])

  return (
    <>
    <Parking datas={datas}/>
    {/* Parking.jsx에 props를 하기 위한 코드 작성(부모 자식 사이) */}
      <div>
        <button onClick={getDatas}>클릭 시 업데이트</button>
        {/* 클릭시 getDatas 함수 실행하여 서버에서 받은 데이터 화면에 출력 */}
      </div>
      {console.log(datas.ENABLELIST?.[0])}
      <div>
        {/* {console.log(5)} */}
        {datas.ENABLELIST?.[0]}
      </div>
    </>
  )
}

export default Datas
// api 정보(확정X)
// "TIME": "2022-07-25T06:13:12",
// "SERIAL_ID": "idsample",
// "ENABLE": 5,
// "OCUPIEDLIST": "[1,3,5,7,9]",
// "TOTAL": 10,
// "ENABLELIST": "[2,4,6,8,10]"

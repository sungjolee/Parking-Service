import React, { useEffect } from 'react';
import styled from 'styled-components'

const SetMyLocation = styled.div`
  position: absolute;
  bottom: 10%;
  right: 1.5%;
  display: flex;
  justifyContent: center;
  alignItems: center;
  width: 50px;
  height: 50px;
  borderRadius: 20%;
  backgroundColor: white;
`

export default function Tmap() {

  function setMyLocation(e) {
    window.location.href = '/'
  }
  // useState 시작
  // useEffect(() => {

    // 현재위치 불러오기 (전체 함수를 감싼다)
    // 나중에 getCurrentPosition -> watchPosition으로 바꾸기
    // let latitude = useRef(null);
    // let longitude = useRef(null);


    // let latitude
    // let longitude
    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log(pos);
      let latitude = pos.coords.latitude;        // 위도
      let longitude = pos.coords.longitude;      // 경도




    let map;
    // 지도 실행
    // 지도 관련 함수는 모두 initTamp() 함수 안에 들어가있어야 한다.
    function initTmap() {
      const Tmapv2 = window.Tmapv2    // Tmap API 에서 Tmapv2를 불러 저장함     
      map = new Tmapv2.Map("map_div", {
          center: new Tmapv2.LatLng(latitude, longitude),
          width: "100%",
          height: "100%",
          zoom:15
      });


      // 지도의 드래그 이동을 가능하게 하는 함수
      function Drag(){
      map.setOptions({ draggable: true }); //지도 드래그 이동을 활성화 합니다.
      }
      
      // 마커 생성(이미지)
      var marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(latitude, longitude), //Marker의 중심좌표 설정.
        icon: "./images/location.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
      });

      var content= "<div class='m-pop' style='position: static; top: 180px; left : 320px; display: flex; font-size: 14px; box-shadow: 5px 5px 5px #00000040; border-radius: 10px; width : 400px; height:100px; background-color: #FFFFFF; align-items: center; padding: 5px;'>"+
        "<div class='img-box' style='width: 110px; height: 90px; border-radius: 10px; background: #f5f5f5 url(resources/images/sample/p-sk-logo.png) no-repeat center;'></div>"+
        "<div class='info-box' style='margin-left : 10px'>"+
        "<p style='margin-bottom: 7px;'>"+
        "<span class='tit' style=' font-size: 16px; font-weight: bold;'>현재위치</span>"+
        "<a href='http://tmapapi.sktelecom.com/' target='_blank' class='link' style='color: #3D6DCC; font-size: 13px; margin-left: 10px;'>홈페이지</a></p>"+
        "<p>"+
        "<span class='new-addr'>서울 중구 삼일대로 343 (우)04538</span>"+
        "</p>"+
        "<p>"+
        "<span class='old-addr' style='color: #707070;'>(지번) 저동1가 114</span>"+
        "</p>"+
        "</div>"+
        "<a href='javascript:void(0)' onclick='onClose()' class='btn-close' style='position: absolute; top: 10px; right: 10px; display: block; width: 15px; height: 15px; background: url(resources/images/sample/btn-close-b.svg) no-repeat center;'></a>"+
        "</div>";
        //Popup 객체 생성.
        let infoWindow = new Tmapv2.InfoWindow({
          position: new Tmapv2.LatLng(latitude, longitude), //Popup 이 표출될 맵 좌표
          content: content, //Popup 표시될 text
          border :'0px solid #FF0000', //Popup의 테두리 border 설정.
          type: 2, //Popup의 type 설정.
          map: map //Popup이 표시될 맵 객체
        });
          
        map.setCenter(new Tmapv2.LatLng(latitude, longitude));
    }
      // return map
    initTmap();
    

  })
  // useState 끝 
  // }, []);

  return (
    <div>
      <div id="map_div" style={{height: "100%", width: "100%", position: "fixed"}}></div>
      <SetMyLocation onClick={ setMyLocation }>
        <img src="./images/reset_location.png" alt=""  
        style={{width: '80%', height: '80%', objectFit: 'cover',}}/>
      </SetMyLocation>
    </div>
  );
}
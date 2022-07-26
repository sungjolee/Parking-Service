import React, { useEffect } from 'react';
import styled from 'styled-components'

const Button = styled.button`
  background-color: red;
`

export default function Tmap() {

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `  
      // 현재위치 불러오기
      // 나중에 getCurrentPosition -> watchPosition으로 바꾸기
      navigator.geolocation.getCurrentPosition(function(pos) {
        console.log(pos);
        var latitude = pos.coords.latitude;
        var longitude = pos.coords.longitude;
        // alert("현재 위치는 : " + latitude + ", "+ longitude);           
        
        var map;
        // 페이지가 로딩이 된 후 호출하는 함수입니다.
        function initTmap(){
          // map 생성
          // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
          map = new Tmapv2.Map("map_div", {
            center: new Tmapv2.LatLng(latitude, longitude),
            width: "100%",
            height: "100%"
          });
          
          // 지도의 드래그 이동을 가능하게 하는 함수입니다.
          function Drag(){
            map.setOptions({ draggable: true }); //지도 드래그 이동을 활성화 합니다.
          }
 
          
          // 마커 생성(기본)
          // var marker = new Tmapv2.Marker({
          //   position: new Tmapv2.LatLng(latitude, longitude), //Marker의 중심좌표 설정.
          //   map: map //Marker가 표시될 Map 설정..
          //   });
          
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
          infoWindow = new Tmapv2.InfoWindow({
            position: new Tmapv2.LatLng(latitude, longitude), //Popup 이 표출될 맵 좌표
            content: content, //Popup 표시될 text
            border :'0px solid #FF0000', //Popup의 테두리 border 설정.
            type: 2, //Popup의 type 설정.
            map: map //Popup이 표시될 맵 객체
          });
            
          map.setCenter(new Tmapv2.LatLng(latitude, longitude));
        }
        initTmap();
      });
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <Button>현재위치 조정</Button>
      <div
        id="map_div"
        style={{
          height: "100%",
          width: "100%",
          position: "fixed",
        }}>

        </div>
    </div>

  );
}
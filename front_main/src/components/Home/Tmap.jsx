import styled from "styled-components";
import { useSelector } from "react-redux";

const SetMyLocation = styled.div`
  position: absolute;
  bottom: 10%;
  right: 1.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 20%;
  background-color: white;
`;

export default function Tmap() {
  const keyword = useSelector((state) => state.keyword.value);
  let latitude;
  let longitude;
  let map;
  let flag = 0;
  const Tmapv2 = window.Tmapv2; // Tmap API 에서 Tmapv2를 불러 저장함

  navigator.geolocation.getCurrentPosition((pos) => {
    if (keyword) {
      latitude = Number(keyword.LATITUDE);
      longitude = Number(keyword.LONGITUDE);

    } else {
      latitude = pos.coords.latitude; // 위도
      longitude = pos.coords.longitude; // 경도
    }

    // 지도 실행 - 지도 관련 함수는 모두 initTamp() 함수 안에 들어가있어야 한다.
    function initTmap() {
      // const Tmapv2 = window.Tmapv2; // Tmap API 에서 Tmapv2를 불러 저장함
      map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(latitude, longitude),
        width: "100%",
        height: "100%",
        zoom: 15,
      });

      map.setOptions({ zoomControl: true }); // 지도 옵션 줌컨트롤 표출 활성화

      // // 지도의 드래그 이동을 가능하게 하는 함수
      // function Drag() {
      //   map.setOptions({ draggable: true }); //지도 드래그 이동을 활성화 합니다.
      // }

      // 마커 생성(이미지)
      new Tmapv2.Marker({
        position: new Tmapv2.LatLng(latitude, longitude), //Marker의 중심좌표 설정.
        icon: "./images/location.png", //Marker의 아이콘.
        map: map, //Marker가 표시될 Map 설정.
      });

      // navigate(`/${keyword.PARKING}`) +
      var content =
        "<div class='m-pop' style='position: static; margin-left: -50%; top: 180px; font-size: 14px; box-shadow: 5px 5px 5px #00000040; border-radius: 15px; width : 280px; height:100px; background-color: white; align-items: center; padding: 5px;'>" +
        // "<div class='img-box' style='width: 110px; height: 90px; border-radius: 10px; background: #f5f5f5 url(resources/images/sample/p-sk-logo.png) no-repeat center;'></div>" +
        "<div class='info-box' style='align-itmes : center'>" +
        "<p style='margin-bottom: 7px;'>" +
        "<div class='tit' style=' font-size: 16px; font-weight: bold;'>" +
        keyword.NAME +
        "</div>" +
        // "<a href='http://localhost:3000/" +
        // keyword.PARKING +
        // "' target='_blank' class='link' style='color: #3D6DCC; font-size: 13px; margin-left: 10px;'></a></p>" +
        // "<p>" +
        "<div class='new-addr'>" +
        keyword.ADDRESS +
        "</div>" +
        "</p>" +
        "<p>" +
        "<span class='old-addr' style='color: #D42F2F; font-weight: bold'>남은 자리 : " +
        keyword.ENABLE +
        " (총 " +
        keyword.TOTAL +
        ")</span>" +
        "</p>" +
        "</div>" +
        "</div>";

      // Popup 객체 생성.
      if (keyword) {
        new Tmapv2.InfoWindow({
          position: new Tmapv2.LatLng(latitude, longitude), //Popup 이 표출될 맵 좌표
          content: content, //Popup 표시될 text
          border: "0px solid #FF0000", //Popup의 테두리 border 설정.
          background: "false", // 배경 뒤 배경 끄기
          type: 2, //Popup의 type 설정.
          map: map, //Popup이 표시될 맵 객체
        });
        // return (<PopUp onClick={`/${datas.PARKING}`}></PopUp>)
      }

      map.setCenter(new Tmapv2.LatLng(latitude, longitude));
    }
    // return map
    initTmap();
  });

  // 현재위치로 위치 조정 버튼
  function setMyLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      latitude = pos.coords.latitude; // 위도
      longitude = pos.coords.longitude; // 경도
      map._status.center._lat = latitude;
      map._status.center._lng = longitude;
      map.setCenter(new Tmapv2.LatLng(latitude, longitude));

      // 현재 위치 마커가 여러개 실행되는 것을 방지)
      if (flag === 0) {
        flag = 1;
        new Tmapv2.Marker({
          position: new Tmapv2.LatLng(latitude, longitude), //Marker의 중심좌표 설정.
          icon: "./images/location.png", //Marker의 아이콘.
          map: map, //Marker가 표시될 Map 설정.
        });
      }
    });
  }

  return (
    <div>
      <div
        id="map_div"
        style={{ height: "100%", width: "100%", position: "fixed" }}
      ></div>
      <SetMyLocation onClick={setMyLocation}>
        <img
          src="./images/set_location.png"
          alt=""
          style={{ width: "80%", height: "80%", objectFit: "cover" }}
        />
      </SetMyLocation>
    </div>
  );
}

// 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어가게 된다. 
// 그리고 그걸 사용하려면 window에서 kakao객체를 뽑아서 사용하면 된다.
// const { kakao } = window;

// export default function KakaoMapScript() {() => {

//     const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//         mapOption = { 
//             center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//             level: 3 // 지도의 확대 레벨
//         };

//     const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
//     return(
//       <div>
//         map
//       </div>
//     );


    // function setCenter() {            
    //     // 이동할 위도 경도 위치를 생성합니다 
    //     const moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
        
    //     // 지도 중심을 이동 시킵니다
    //     map.setCenter(moveLatLon);
    // }

    // function panTo() {
    //     // 이동할 위도 경도 위치를 생성합니다 
    //     const moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
        
    //     // 지도 중심을 부드럽게 이동시킵니다
    //     // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    //     map.panTo(moveLatLon);            
    // }
//   }        
// }
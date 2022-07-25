/* <script script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=l7xx191c2dd87aba414d9cfbc0256f3cbdac"></script> */
import React, { useEffect } from 'react';

export default function Tmap() {

  useEffect(() => {
    function initTmap() {
        var map = new Tmapv2.Map("map_div", {
            center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841),
            width: "100%",
            height: "100%",
            zoom:15
        });
    }
  window.onload = initTmap;

  }, []);

  return (
    <div 
      id="map_div"
      onLoad="initTmap()"
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
      }}
    />
  );
}
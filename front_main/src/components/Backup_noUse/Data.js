export default function Data() {
  return (
    function initTmap() {
      var map = new Tmapv2.Map("TMapApp", {
          center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841),
          width: "100%",
          height: "100%",
          zoom:15
      });
  }
  )
};


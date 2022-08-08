import { useState, useEffect } from "react";

function useLocalStorage(key, initialState) {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;


// const myParkingZone=() =>{
//   const parkingZone = { id : myPosition };
//   window.localStorage.setItem("myPosition", JSON.stringify(parkingZone));

//   useEffect(() => {
//     window.localStorage.getItem("myPosition", JSON.stringify(myPosition), [myPosition]);
//   })
// }


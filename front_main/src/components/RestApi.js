import React, { useState } from 'react'
import axios from 'axios'

export default function RestAPI() {
  const [text, setText] = useState([]);
  
  return(
    <>
    <div>
      <button
        onClick={() => {
          axios
            .post("http://127.0.0.1:8000/review/", {
              title: "주차장이름",
              content: "주차장 id",
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
        }}>
          POST
      </button>
      <button onClick={() => {
        axios
          .get("http://127.0.0.1:8000/review")
          .then((response) => {
            setText([...response.data]);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }}>
        GET
      </button>
    </div>
    {text.map((e) => (
      <div>
        {" "}
        <div className="list">
          <span>
            {e.id}번, {e.title}, {e.content}, {e.update_at}
          </span>
          <button 
            className="btn-delete"
            onClick={() => {
              axios.delete(`http://127.0.0.1:8000/review/${e.id}`);
              setText(text.filter((text) => text.id !== e.id));
            }}>
          DELETE    
          </button>{" "}
        </div>
      </div>
    ))}
    </>
  );
}


// api 정보(확정x)
// "ID"
// "TIME"
// "emptySpotNow"
// "totalSpot"
// "emptySpotList" : ["s5", "s9"] 
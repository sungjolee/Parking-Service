// import { createSlice } from "@reduxjs/toolkit";

// export const getDatas = createSlice({
//   name: "datas",
//   initialState: {
//     value: [],
//   },
//   reducers: {
//     myDatas: (state, action) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value = action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { myDatas } = getDatas.actions;

// export default getDatas.reducer;

// //action creator
// const fetchDataAsync = () => {
//   return (dispatch) => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/users")
//       .then(({ data }) => dispatch({ type: FETCH_ALL, users: data }))
//       .catch((err) => dispatch({ type: FETCH_FAIL, error: err }));
//   };
// };
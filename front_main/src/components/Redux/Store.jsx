import { configureStore } from "@reduxjs/toolkit";
import getSearchName from "./getSearchName";
import getLatitude from "./getLatitude";

export default configureStore({
  reducer: {
    keyword: getSearchName,
    latitude: getLatitude,
  },
});

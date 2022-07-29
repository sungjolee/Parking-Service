import { configureStore } from '@reduxjs/toolkit'
import getSearchName from './getSearchName'


export default configureStore({
  reducer: {
    keyword: getSearchName
  }
})
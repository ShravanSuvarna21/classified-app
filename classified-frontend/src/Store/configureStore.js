import { configureStore } from "@reduxjs/toolkit";
import  CategorySlice from '../Classified[1]/Classified/CategorySlice'
import ProductSlice from "../Classified[1]/Classified/ProductSlice";
import UserSlice from "../Classified[1]/Classified/UserSlice";
const store = configureStore({
  reducer: {
    categories:CategorySlice,
    user:UserSlice,
    products:ProductSlice
  },
});
export default store;
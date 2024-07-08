import {  configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user/userSlice';
import theaterReducer from "./reducers/theaters/theaterSlice";
import adminReducer from "./reducers/admin/adminSlice";



export const store =configureStore({
    reducer:{
        user:userReducer,
        theater:theaterReducer,
        admin:adminReducer,
    },
})

export type RootState=ReturnType<typeof store.getState>;

export type AppDispatch=typeof store.dispatch;

export default store;
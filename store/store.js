import { configureStore } from "@reduxjs/toolkit";
import BookingReducer from '../features/BookingSlice'


export default configureStore( {
    name: 'BookingApp',
    reducer: {
        booking: BookingReducer
    }
})
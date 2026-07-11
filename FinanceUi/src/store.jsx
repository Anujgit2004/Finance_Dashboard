import { configureStore } from '@reduxjs/toolkit'; 
import SliceName from './slice'
export default configureStore({
    reducer:{
        First:SliceName
    }
})
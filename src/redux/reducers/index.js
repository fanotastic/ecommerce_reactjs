import { combineReducers } from 'redux';
import { userReducer } from './userReducer'
import { productsReducer } from './productsReducer'


export const rootReducers = combineReducers({
    userReducer,
    productsReducer
})

// si redux ini nnti taronya di src/index.js karna dia kan globalstoarge
/**
 *combineReducers adalah sistem yg menggabungkan semua reducers/rak
 yg dijadikan parameter utk membuat globalStorage  */
 
 // combineReducers --> sebagai penghubung semua reducer
// import
import Axios from 'axios';
import { URL, GET_CART_USER, EDIT_CART_USER, DELETE_CART_USER } from './helper'

export const getUserCart = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get('http://localhost:2000/getCart/cartProduct')
            dispatch({type: GET_CART_USER, payload: res.data})
        }
        catch (err) {
            console.error(err)
        }
    }
}

export const EditCartUser = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('http://localhost:2000/editCart')
            dispatch({type: EDIT_CART_USER, payload: res.data})
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const DeleteCartUser = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('http://localhost:2000/getCart/deleteCartProduct')
            dispatch({type: DELETE_CART_USER, payload: res.data})
        }
        catch(err) {
            console.log(err)
        }
    }
}
import Axios from 'axios'
import {GET_CANDY,GET_CHIPS,GET_CHOCO,GET_DRINK,GET_PRODUCT,GET_PRODASC,GET_PRODDESC} from './helpers'

export const getAllProduct = ()=>{
    return async (dispatch) =>{
        try {
            const res = await Axios.get('http://localhost:2000/product/getAllProduct')
            dispatch({type: GET_PRODUCT, payload: res.data})
        }
        catch (err){
            console.log(err)
        }
    }
}

export const getProdutCandy = ()=>{
    return async (dispatch) =>{
        try {
            const res = await Axios.get('http://localhost:2000/product/candyProduct')
            dispatch({type: GET_CANDY, payload: res.data})
        }
        catch (err){
            console.log(err)
        }
    }
}

export const getProductChips = () =>{
    return async (dispatch) =>{
        try{
            const res = await Axios.get('http://localhost:2000/product/chipsProduct')
            dispatch({type: GET_CHIPS, payload: res.data})
        }
        catch (err){
            console.log(err)
        }
    }
}

export const getProductDrink = () =>{
    return async (dispatch) =>{
        try{
            const res = await Axios.get('http://localhost:2000/product/softDrinkProduct')
            dispatch({type: GET_DRINK, payload: res.data})
        }
        catch (err){
            console.log(err)
        }
    }
}

export const getProductChoco = () =>{
    return async (dispatch) =>{
        try{
            const res = await Axios.get('http://localhost:2000/product/chocoProduct')
            dispatch({type: GET_CHOCO, payload: res.data})
        }
        catch (err){
            console.log(err)
        }
    }
}

export const getProductAscend = () =>{
    return async (dispatch) =>{
        try{
            const res = await Axios.get('http://localhost:2000/product/productAscending')
            dispatch({type: GET_PRODASC, payload: res.data})
        }
        catch (err){
            console.log(err)
        }
    }
}

export const getProductDescend = () =>{
    return async (dispatch) =>{
        try{
            const res = await Axios.get('http://localhost:2000/product/productDescending')
            dispatch({type: GET_PRODDESC, payload: res.data})
        }
        catch (err){
            console.log(err)
        }
    }
}
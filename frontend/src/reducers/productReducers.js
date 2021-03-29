// import {GET_CANDY,GET_CHIPS,GET_CHOCO,GET_DRINK,GET_PRODASC,GET_PRODDESC,GET_PRODUCT} from '../action'

const INITIAL_STATE = {
    product: []
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_PRODUCT':
            return {
                product: action.payload
            }
        case 'GET_CANDY':
            return {
                product: action.payload
            }
        case 'GET_CHIPS':
            return {
                product: action.payload
            }
        case 'GET_DRINK':
            return {
                product: action.payload
            }
        case 'GET_CHOCO':
            return {
                product: action.payload
            }
        case 'GET_PRODASC':
            return {
                product: action.payload
            }
        case 'GET_PRODDESC':
            return {
                product: action.payload
            }
        default: return state
    }
}

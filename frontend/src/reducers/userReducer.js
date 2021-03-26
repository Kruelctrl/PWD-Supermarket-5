let INITIAL_STATE = {
    id_user: null,
    username: '',
    password: '',
    email: '',
    alamat: '',    
    regStatus: null,
    errLogin: ''

}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                id_user: action.payload.id_user,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                regStatus: action.payload.status,
                alamat: action.payload.alamat
              
            }
        case 'LOG_OUT':
            return INITIAL_STATE
        case 'VERIFICATION':
            return {
                ...state,
                regStatus: "verified"
            }
        case 'LOGIN_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        default:
            return state
    }
}
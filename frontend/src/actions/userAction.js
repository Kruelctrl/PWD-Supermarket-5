import Axios from 'axios'

export const login = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('http://localhost:2000/user/login', data)
            console.log(res.data)

            localStorage.token = res.data.token

            dispatch({ type: 'LOG_IN', payload: res.data })
        }
        catch (err) {
            dispatch({ type: 'LOGIN_ERR', payload: err.response.data })
            console.log(err ? `ERROR : ${err.response.data}` : err)
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem('token')
            dispatch({ type: 'LOG_OUT' })
        }
        catch (err) {
            console.log(err)
        }

    }
}

export const keepLogin = () => {
    return async (dispatch) => {
        try {
            // console.log('keep login')
            // get token from local storage
            const token = localStorage.getItem("token");
            // console.log(token)

            // get user data from token
            const res = await Axios.post('http://localhost:2000/user/keepLogin', { token })
            // console.log('hasil dari api', res.data)

            dispatch({ type: 'LOG_IN', payload: res.data })
        }
        catch (err) {
            // console.log(err)
            localStorage.removeItem('id')
            localStorage.removeItem('token')
            dispatch({ type: 'LOG_OUT' })
        }
    }
}

export const verification = () => {
    return {
        type: 'VERIFICATION'
    }
}
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = ()=>{
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authenticate = (email, password, isSignin) => {
    return dispatch => {        
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const token = 'AIzaSyA-DLCkKv2O6CpskVOeKwIIhez_KxSrK_M';
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+token
        if(isSignin){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+token
        }
        axios.post(url, authData)
        .then((response)=>{            
            dispatch( authSuccess(response.data.idToken, response.data.localId) );
        })
        .catch((error)=>{
            dispatch( authFail(error.response.data.error) );
        });        
    }
}
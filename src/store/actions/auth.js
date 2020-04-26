import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes';

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    }
    //Регистрация
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBRj1R0UEHzbzdDaOOQIhjqWUvDsusN4Mo'
    //Вход
    if (isLogin) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBRj1R0UEHzbzdDaOOQIhjqWUvDsusN4Mo'
    }
    //запрос
    const response = await axios.post(url, authData)
    //получаем токен сессию и т.д
    const data = response.data
//время сейчас + час
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    
    // для поддержания сессии в localStorage кладем токен,иметь к нему доступ 
    localStorage.setItem('token', data.idToken)// позволяет держать сессию
    localStorage.setItem('userId', data.localId) //для определения пользователя 
    localStorage.setItem('expirationDate', expirationDate)//когда закончится сессия

    //поддержка сессии 
    dispatch(authSuccess(data.idToken))
    //когда закончится сессия 
    dispatch(autoLogout(data.expiresIn))
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
    //сбросить данные
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}


export function autoLogin(){
  
}
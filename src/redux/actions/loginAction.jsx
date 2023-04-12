import * as actionType from '../constants/loginConstants';
import * as api from '../api/index';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import Chart from "react-apexcharts";

export const loginWithPhone = (phone, password, cookies, setCookie) => async(dispatch) => {
  

    // console.log(phone + ' , ' + password);
    try{
        dispatch({
          type: actionType.LOGIN_WITH_PHONE_REQUEST,
        });

        const { data } = await api.loginWithPhoneNumber(phone, password);
        // console.log(data);

        dispatch({ 
            type: actionType.LOGIN_WITH_PHONE_SUCCESS, 
            payload: true
          });
          // console.log(data[0].fname);
          let expires = new Date();
          expires.setTime(expires.getTime() + (2 * 60 * 60 * 1000))
          setCookie('uid', data[0].id, {path: '/', expires})
          setCookie('fname', data[0].fname, {path: '/', expires})
          setCookie('lname', data[0].lname, {path: '/', expires})
          setCookie('phoneNo', data[0].phoneNo, {path: '/', expires})
          setCookie('access_token', data[0].accessToken, { path: '/',  expires})

    }catch(error){
        dispatch({
            type:actionType.LOGIN_WITH_PHONE_FAIL,
            payload: 
              error.response && error.response.data.message 
              ?error.response.data.message:error.message,
            });
          // console.log(error.response && error.response.data.message 
            ?error.response.data.message:error.message);
    }
};



export const  adminSignUp = (userName, email, password, accessKey)=> async (dispatch)=>{
    try{
      dispatch({
        type: actionType.ADMIN_SIGNUP_REQUEST,
      });

      const { data } = await api.admin_signup(userName ,email, password, accessKey);
      // console.log(data);

      dispatch({ 
          type: actionType.ADMIN_SIGNUP_SUCCESS, 
          payload: data 
        });
       

  }catch(error){
      dispatch({
          type:actionType.ADMIN_SIGNUP_FAIL,
          payload: 
            error.response && error.response.data.message 
            ?error.response.data.message:error.message,
          });
        // console.log(error.response && error.response.data.message 
          ?error.response.data.message:error.message);
  }
}

export const adminLogin = (email , password) => async (dispatch) =>{
  
  // try{
  //     dispatch({
  //       type: actionType.ADMIN_LOGIN_REQUEST,
  //     });

  //     const { data } = await api.adminLogin(email, password);
  //     // console.log(data);

  //     dispatch({ 
  //         type: actionType.ADMIN_LOGIN_SUCCESS, 
  //         payload: data 
  //       });
       

  // }catch(error){
  //     dispatch({
  //         type:actionType.ADMIN_LOGIN_FAIL,
  //         payload: 
  //           error.response && error.response.data.message 
  //           ?error.response.data.message:error.message,
  //         });
  //       // console.log(error.response && error.response.data.message 
  //         ?error.response.data.message:error.message);
  // }
}



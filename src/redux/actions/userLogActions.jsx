import * as actionType from '../constants/userConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getUserLog = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_USER_LOGS_REQUEST,
        });
        const {data} = await api.fetchUserLogs();
        console.log(data);
        dispatch({
            type: actionType.GET_USER_LOGS_SUCCESS,
            payload: data,
        }); 
    } catch (error) {
        dispatch({
            type:actionType.GET_USER_LOGS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getUserLogDetail = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_USER_LOGS_COUNT_REQUEST,
        });
        const {data} = await api.fetchUserLogCounts();
        console.log(data);
        dispatch({
            type: actionType.GET_USER_LOGS_COUNT_SUCCESS,
            payload: data,
        }); 
    } catch (error) {
        dispatch({
            type:actionType.GET_USER_LOGS_COUNT_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const createUserLog = (href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time, state, county, userId) => async (dispatch) => {
	try{
    dispatch({
      type: actionType.CREATE_USER_LOGS_REQUEST,
    });
		const { data } = await  api.createUserLogs(href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time,state, county, userId);
		
	dispatch({ 
      type: actionType.CREATE_USER_LOGS_SUCCESS, 
      payload: data 
    });
	} catch (error) {
		dispatch({
      type:actionType.CREATE_USER_LOGS_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
      });
	}
};
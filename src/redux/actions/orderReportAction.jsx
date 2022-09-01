import * as actionType from '../constants/orderConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getOrderReports = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDER_REPORTS_REQUEST,
        });
        const {data} = await api.fetchOrderReports();
        
        dispatch({
            type: actionType.GET_ORDERS_REPORTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_REPORTS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getOrderTotal = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDER_TOTALS_REQUEST,
        });
        const {data} = await api.fetchOrderTotal();
        
        dispatch({
            type: actionType.GET_ORDERS_TOTALS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_TOTALS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getOrderReportByYear = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDER_REPORTS_BY_YEAR_REQUEST,
        });
        const {data} = await api.fetchOrderReportByYear();
        
        dispatch({
            type: actionType.GET_ORDERS_REPORTS_BY_YEAR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_REPORT_BY_YEAR_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getOrderReportByMonth = (month) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDER_REPORTS_BY_MONTH_REQUEST,
        });
        const {data} = await api.fetchOrderReportByMonth(month);
        
        dispatch({
            type: actionType.GET_ORDERS_REPORTS_BY_MONTH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_REPORT_BY_MONTH_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getOrderReportByWeek = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDER_REPORTS_BY_WEEK_REQUEST,
        });
        const {data} = await api.fetchWeeklyReport();
        
        dispatch({
            type: actionType.GET_ORDERS_REPORTS_BY_WEEK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_REPORT_BY_WEEK_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getOrderReportOfLastWeek = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDER_REPORTS_OF_LAST_WEEK_REQUEST,
        });
        const {data} = await api.fetchOrderReports();
        
        dispatch({
            type: actionType.GET_ORDERS_REPORTS_OF_LAST_WEEK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_REPORT_OF_LAST_WEEK_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};


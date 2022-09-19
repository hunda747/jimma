import * as actionType from '../constants/restaurantConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getAllRestaurants = () => async(dispatch)=>{
	try {
		dispatch({
			type: actionType.GET_ALL_RESTAURANTS_REQUEST,
		})
		const {data} = await api.fetchRestaurants();
		dispatch({
			type: actionType.GET_ALL_RESTAURANTS_SUCCESS,
			payload: data
		})
	} catch (error) {
    dispatch({
      type: actionType.GET_ALL_RESTAURANTS_FAIL,
      payload:
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
    });
	}
}

export const getRestaurants = () => async(dispatch)=>{
	try {
		dispatch({
			type: actionType.GET_ALL_RESTAURANTS_REQUEST,
		})
		const {data} = await api.fetchAllRestaurants();
		dispatch({
			type: actionType.GET_ALL_RESTAURANTS_SUCCESS,
			payload: data
		})
	} catch (error) {
    dispatch({
      type: actionType.GET_ALL_RESTAURANTS_FAIL,
      payload:
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
    });
	}
}

export const getRestaurantById = (id) => async(dispatch)=>{
	try {
		dispatch({
			type: actionType.GET_RESTAURANT_REQUEST,
		})
		const {data} = await api.fetchRestaurantById(id);
		dispatch({
			type: actionType.GET_RESTAURANT_SUCCESS,
			payload: data
		})
	} catch (error) {
    dispatch({
      type: actionType.GET_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
    });
	}
}

export const createRestaurant = (name, description, rating, open_days, working_hour, img, status) => async (dispatch)=>{
	console.log('in create reastuarant action');
	try {
		dispatch({
			type: actionType.CREATE_RESTAURANT_REQUEST,
		});
		api.createRestaurant(name, description, rating, open_days, working_hour, img, status);
		dispatch({
			type: actionType.CREATE_RESTAURANT_SUCCESS,    
			// payload: data        
		});			
	} catch (error) {
		dispatch({
		type: actionType.CREATE_RESTAURANT_FAIL,
		payload: 
      error.response && error.response.data.message 
      ?error.response.data.message:error.message,
		});
	}
}

export const updateRestaurant = (name, description, rating, open_days, working_hour, img, id, status) => async (dispatch)=>{
	console.log('in change reastuarant action');
	try {
		dispatch({
			type: actionType.CREATE_RESTAURANT_REQUEST,
		});
		api.changeRestaurant(name, description, rating, open_days, working_hour, img, id, status);
		dispatch({
			type: actionType.CREATE_RESTAURANT_SUCCESS,    
			// payload: data        
		});			
	} catch (error) {
		dispatch({
		type: actionType.CREATE_RESTAURANT_FAIL,
		payload: 
      error.response && error.response.data.message 
      ?error.response.data.message:error.message,
		});
	}
}


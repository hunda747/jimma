import * as actionType from '../constants/foodConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getAllFood = () => async(dispatch)=>{
	try {
		dispatch({
			type: actionType.GET_ALL_FOOD_REQUEST,
		})
		const {data} = await api.fetchFoods();
		dispatch({
			type: actionType.GET_ALL_FOOD_SUCCESS,
			payload: data
		})
	} catch (error) {
    dispatch({
      type: actionType.GET_ALL_FOOD_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
    });
	}
}

export const getFoodsByRestaurant = (restaurant) => async(dispatch)=>{
	try {
		dispatch({
			type: actionType.GET_FOOD_REQUEST,
		})
		const {data} = await api.fetchFoodsByRestaurant(restaurant);
		dispatch({
			type: actionType.GET_FOOD_SUCCESS,
			payload: data
		})
	} catch (error) {
    dispatch({
      type: actionType.GET_FOOD_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
    });
	}
}

export const getAllFoodsByRestaurant = (restaurant) => async(dispatch)=>{
	try {
		dispatch({
			type: actionType.GET_FOOD_REQUEST,
		})
		const {data} = await api.fetchAllFoodsByRestaurant(restaurant);
		dispatch({
			type: actionType.GET_FOOD_SUCCESS,
			payload: data
		})
	} catch (error) {
    dispatch({
      type: actionType.GET_FOOD_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
    });
	}
}

export const searchFood = (food) => async(dispatch)=>{
	try {
		dispatch({
			type: actionType.GET_FOOD_REQUEST,
		})
		const {data} = await api.fetchFoodsBySearch(food);
		dispatch({
			type: actionType.GET_FOOD_SUCCESS,
			payload: data
		})
	} catch (error) {
    dispatch({
      type: actionType.GET_FOOD_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
    });
	}
}

export const createFood = (food_name,description,type,restaurant,price) => async (dispatch)=>{
	try {
		dispatch({
			type: actionType.CREATE_FOOD_REQUEST,
		});
		api.createFood(food_name,description,type,restaurant,price);
		dispatch({
			type: actionType.CREATE_FOOD_SUCCESS,    
			// payload: data        
		});			
	} catch (error) {
		dispatch({
		type: actionType.CREATE_FOOD_FAIL,
		payload: 
      error.response && error.response.data.message 
      ?error.response.data.message:error.message,
		});
	}
}

export const updateFood = (food_name,description,type,id,price, status) => async (dispatch)=>{
	try {
		dispatch({
			type: actionType.CREATE_FOOD_REQUEST,
		});
		api.changeFood(food_name,description,type,id, price, status);
		dispatch({
			type: actionType.CREATE_FOOD_SUCCESS,    
			// payload: data        
		});
	} catch (error) {
		dispatch({
		type: actionType.CREATE_FOOD_FAIL,
		payload: 
      error.response && error.response.data.message 
      ?error.response.data.message:error.message,
		});
	}
}


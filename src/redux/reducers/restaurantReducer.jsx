import * as actionTypes from '../constants/restaurantConstant';

export const getRestaurantReducer = (state = {restaurant: [] }, action)=>{
	switch(action.type){
		case actionTypes.CREATE_RESTAURANT_REQUEST:
			return{
				loading: true,
			}
		case actionTypes.CREATE_RESTAURANT_SUCCESS:
			return {
				loading:false,
				// restaurant: action.payload
			}
		case actionTypes.CREATE_RESTAURANT_FAIL:
			return{
				loading:false,
				error: action.payload
			}
		case actionTypes.GET_RESTAURANT_REQUEST:
			return{
				loading: true,
				restaurant: []
			}
		case actionTypes.GET_RESTAURANT_SUCCESS:
			return{
				loading:false,
				restaurant: action.payload
			}
		case actionTypes.GET_RESTAURANT_FAIL:
			return{
				loading:false,
				error: action.payload,
			}
		case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
			return{
				loading: true,
				restaurant: []
			}
		case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
			return{
				loading:false,
				restaurant: action.payload
			}  
		case actionTypes.GET_ALL_RESTAURANTS_FAIL:
			return{
				loading:false,
				error: action.payload,
			}
		default:
			return state;
	}
};

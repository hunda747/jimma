import * as actionTypes from '../constants/foodConstant';

export const getFoodReducer = (state = {food: [] }, action)=>{
	switch(action.type){
		case actionTypes.CREATE_FOOD_REQUEST:
			return{
				loading: true,
			}
		case actionTypes.CREATE_FOOD_SUCCESS:
			return {
				loading:false,
				// FOOD: action.payload
			}
		case actionTypes.CREATE_FOOD_FAIL:
			return{
				loading:false,
				error: action.payload
			}
		case actionTypes.GET_FOOD_REQUEST:
			return{
				loading: true,
				food: []
			}
		case actionTypes.GET_FOOD_SUCCESS:
			return{
				loading:false,
				food: action.payload
			}  
		case actionTypes.GET_FOOD_FAIL:
			return{
				loading:false,
				error: action.payload,
			}
		case actionTypes.GET_ALL_FOOD_REQUEST:
			return{
				loading: true,
				food: []
			}
		case actionTypes.GET_ALL_FOOD_SUCCESS:
			return{
				loading:false,
				food: action.payload
			}  
		case actionTypes.GET_ALL_FOOD_FAIL:
			return{
				loading:false,
				error: action.payload,
			}
		default:
			return state;
	}
};

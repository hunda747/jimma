import * as actionTypes from '../constants/categoryConstant'

export const getCagegoryReducer = (state = {categories: []}, action)=>{

    switch(action.type){
        case actionTypes.GET_CATEGORY_REQUEST:
            return{
                loading: true,
                categories: []
            }
        case actionTypes.GET_CATEGORY_SUCCESS:
            return{
                loading: false,
                categories: action.payload
            }
        case actionTypes.GET_CATEGORY_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }


}
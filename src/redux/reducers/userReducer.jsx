import * as actionTypes from '../constants/userConstant';


export const getUserReducer = (state = {user: [] }, action)=>{
	switch(action.type){
		case actionTypes.CREATE_USER_BY_PHONE_REQUEST:
			return{
				loading: true,
			}
		case actionTypes.CREATE_USER_BY_PHONE_SUCCESS:
			return {
				loading:false,
				// user: action.payload
			}
		case actionTypes.CREATE_USER_BY_PHONE_FAIL:
			return{
				loading:false,
				error: action.payload
			}
		case actionTypes.LOGIN_WITH_PHONE_REQUEST:
			return{
				loading: true,
				user: []
			}
		case actionTypes.LOGIN_WITH_PHONE_SUCCESS:
			return{
				loading:false,
				user: action.payload
			}  
		case actionTypes.LOGIN_WITH_PHONE_FAIL:
			return{
				loading:false,
				error: action.payload,
			}
		case actionTypes.GET_ALL_USER_REQUEST:
			return{
				loading: true,
				user: []
			}
		case actionTypes.GET_ALL_USER_SUCCESS:
			return{
				loading:false,
				user: action.payload
			}  
		case actionTypes.GET_ALL_USER_FAIL:
			return{
				loading:false,
				error: action.payload,
			}
		default:
			return state;
	}
};

// export const getUserLogCount = (state = {userLog: [] }, action)=>{
//     switch(action.type){
//         case actionTypes.GET_USER_LOGS_COUNT_REQUEST:
//             return{
//                 loading: true,
//                 userLog: []
//             }
//         case actionTypes.GET_USER_LOGS_COUNT_SUCCESS:
//             return{
//                 loading:false,
//                 userLog: action.payload
//             }  
//         case actionTypes.GET_USER_LOGS_COUNT_FAIL:
//             return{
//                 loading:false,
//                 error: action.payload,
//             }
//         default:
//             return state;
//     }
// };
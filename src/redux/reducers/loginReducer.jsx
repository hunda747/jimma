import * as actionTypes from '../constants/loginConstants';


export const loginReducer = (state = {LoggedUser: []} , action)=>{
    // switch(action.type){
    //     case actionTypes.LOGIN_WITH_PHONE_REQUEST:
    //         return{
    //             loading: true,
    //             LoggedUser: []
    //         }
    //     case actionTypes.LOGIN_WITH_PHONE_SUCCESS:
    //         return{
    //             loading: false,
    //             LoggedUser: action.payload
                  
    //         }
    //     case actionTypes.LOGIN_WITH_PHONE_FAIL:
    //         return{
    //             loading: false,
    //             LoggedUser: action.payload
                
    //         }
      
    //     default:
    //         return state;
    // }
}
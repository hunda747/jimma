import * as actionType from "../constants/userConstant";
import * as api from "../api/index";
import axios from "axios";

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_ALL_USER_REQUEST,
    });
    const { data } = await api.fetchUsers();
    dispatch({
      type: actionType.GET_ALL_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createUserByPhone =
  (fname, lname, phone, password) => async (dispatch) => {
    try {
      dispatch({
        type: actionType.CREATE_USER_BY_PHONE_REQUEST,
      });
      api.createUser(fname, lname, phone, password);
      dispatch({
        type: actionType.CREATE_USER_BY_PHONE_SUCCESS,
        // payload: data
      });
    } catch (error) {
      dispatch({
        type: actionType.CREATE_USER_BY_PHONE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const loginWithPhone = (phone, password) => async (dispatch) => {
// 	try {
// 		dispatch({
// 			type: actionType.LOGIN_WITH_PHONE_REQUEST,
// 		})
// 		// console.log('in action login');
// 		const {data} = await api.loginWithPhoneNumber(phone,password);

// 		// console.log(data);

// 		dispatch({
// 			type: actionType.LOGIN_WITH_PHONE_SUCCESS,
// 				payload: data,
// 		})
// 	} catch (error) {
// 		dispatch({
// 			type: actionType.LOGIN_WITH_PHONE_FAIL,
// 			payload:
// 				error.response && error.response.data.message
// 				?error.response.data.message:error.message,
// 		});
// 	}
// }

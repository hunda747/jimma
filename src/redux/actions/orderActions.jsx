import * as actionType from '../constants/orderConstant';
import * as api from '../api/index';
import axios from 'axios';



// export const getRecentOrderLocation = (userId)=> async (dispatch)=>{
// 	try {
// 		dispatch({
// 			type: actionType.GET_RECENT_ORDER_LOCATION,
// 		})
// 		const {data} = await api.getOrderLocation(userId);
// 		dispatch({
// 			type: actionType.GET_RECENT_ORDER_LOCATION_SUCCESS,
// 			payload: data
// 		})	
// 	} catch (error) {
// 		dispatch({
// 			type:actionType.GET_RECENT_ORDER_LOCATION_FAIL,
// 			payload: 
// 				error.response && error.response.data.message 
// 				?error.response.data.message:error.message,
// 		});
// 	}
// }

export const createOrders = (date,userId,total,latitude ,longitude,contact,no_item,orders,address) => async (dispatch) => {
  console.log('action : ' + total);
	try{
    dispatch({
      type: actionType.CREATE_ORDERS_REQUEST,
    });
		const { data } = await  api.createOrder(date,userId,total,latitude ,longitude,contact,no_item,orders,address);
		dispatch({ 
      type: actionType.CREATE_ORDERS_SUCCESS, 
      payload: data 
    });
	} catch (error) {
		dispatch({
      type:actionType.CREATE_ORDERS_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
      });
	}
};


export const getOrders = () => async (dispatch)=>{
	try {
		dispatch({
			type: actionType.GET_ORDERS_REQUEST,
		});
		const {data} = await api.fetchOrder();
		
		dispatch({
			type: actionType.GET_ORDERS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type:actionType.GET_ORDERS_FAIL,
			payload: 
				error.response && error.response.data.message 
				?error.response.data.message:error.message,
		});
	}
};

export const getOrdersInprogress = () => async (dispatch)=>{
  try {
    dispatch({
      type: actionType.GET_ORDERS_INPROGRESS_REQUEST,
    });
    const {data} = await api.fetchOrdersInprogress();
    
    dispatch({
      type: actionType.GET_ORDERS_INPROGRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type:actionType.GET_ORDERS_INPROGRESS_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
    });
  }
};

export const getOrdersPending = () => async (dispatch)=>{
  try {
    dispatch({
      type: actionType.GET_ORDERS_PENDING_REQUEST,
    });
    const {data} = await api.fetchOrdersPending();
    
    dispatch({
      type: actionType.GET_ORDERS_PENDING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
    type:actionType.GET_ORDERS_PENDING_FAIL,
    payload: 
      error.response && error.response.data.message 
      ?error.response.data.message:error.message,
    });
  }
};

export const getOrdersComplete = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDERS_PENDING_REQUEST,
        });
        const {data} = await api.fetchOrdersComplete();
        
        dispatch({
            type: actionType.GET_ORDERS_PENDING_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_PENDING_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getOrdersById = (id) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDERS_BY_ID_REQUEST,
        });
        const {data} = await api.fetchOrdersById(id);
        
        dispatch({
            type: actionType.GET_ORDERS_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_BY_ID_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getOrdersbyUser = (id) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDERS_BY_ID_REQUEST,
        });
        const {data} = await api.fetchOrdersbyUser(id);
        
        dispatch({
            type: actionType.GET_ORDERS_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_BY_ID_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};


export const changeOrderStatus = (id, status) => async (dispatch)=>{
  try {
      // dispatch({
      //     // type: actionType.GET_ORDERS_BY_ID_REQUEST,
      // });
      const {data} = await api.changeOrderStatus(id, status);
      
      // dispatch({
      //     type: actionType.GET_ORDERS_BY_ID_SUCCESS,
      //     payload: data,
      // });
  } catch (error) {
      dispatch({
          type:actionType.GET_ORDERS_BY_ID_FAIL,
          payload: 
              error.response && error.response.data.message 
              ?error.response.data.message:error.message,
      });
  }
};

// export const getCompleteOrdersByDate = (date) => async (dispatch)=>{
//     try {
//         dispatch({
//             type: actionType.GET_ORDERS_BY_ID_REQUEST,
//         });
//         const {data} = await api.fetchCompleteOrdersByDate(date);
        
//         dispatch({
//             type: actionType.GET_ORDERS_BY_ID_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type:actionType.GET_ORDERS_BY_ID_FAIL,
//             payload: 
//                 error.response && error.response.data.message 
//                 ?error.response.data.message:error.message,
//         });
//     }
// };

// export const getOrdersByIdDate = (id, date) => async (dispatch)=>{
//     try {
//         dispatch({
//             type: actionType.GET_ORDERS_BY_ID_REQUEST,
//         });
//         const {data} = await api.fetchOrdersbyIdDate(id, date);
        
//         dispatch({
//             type: actionType.GET_ORDERS_BY_ID_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type:actionType.GET_ORDERS_BY_ID_FAIL,
//             payload: 
//                 error.response && error.response.data.message 
//                 ?error.response.data.message:error.message,
//         });
//     }
// };

// export const getOrdersByDeliveryId = (id) => async (dispatch)=>{
//     try {
//         dispatch({
//             type: actionType.GET_ORDERS_BY_ID_REQUEST,
//         });
//         const {data} = await api.fetchOrdersByDeliveryId(id);
        
//         dispatch({
//             type: actionType.GET_ORDERS_BY_ID_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type:actionType.GET_ORDERS_BY_ID_FAIL,
//             payload: 
//                 error.response && error.response.data.message 
//                 ?error.response.data.message:error.message,
//         });
//     }
// };

// export const getOrdersByDeliveryIdAndDate = (id, date) => async (dispatch)=>{
//     try {
//         dispatch({
//             type: actionType.GET_ORDERS_BY_ID_REQUEST,
//         });
//         const {data} = await api.fetchOrdersByDeliveryIdAndDate(id, date);
        
//         dispatch({
//             type: actionType.GET_ORDERS_BY_ID_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type:actionType.GET_ORDERS_BY_ID_FAIL,
//             payload: 
//                 error.response && error.response.data.message 
//                 ?error.response.data.message:error.message,
//         });
//     }
// };

// export const changeOrderStatus = (id, status) => async (dispatch)=>{
//     try {
//         // dispatch({
//         //     // type: actionType.GET_ORDERS_BY_ID_REQUEST,
//         // });
//         const {data} = await api.changeOrderStatus(id, status);
        
//         // dispatch({
//         //     type: actionType.GET_ORDERS_BY_ID_SUCCESS,
//         //     payload: data,
//         // });
//     } catch (error) {
//         dispatch({
//             type:actionType.GET_ORDERS_BY_ID_FAIL,
//             payload: 
//                 error.response && error.response.data.message 
//                 ?error.response.data.message:error.message,
//         });
//     }
// };


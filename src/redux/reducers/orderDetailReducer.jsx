import * as actionTypes from "../constants/orderConstant";

export const getOrderDetailReducer = (state = { orderDetail: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDER_DETAILS_REQUEST:
      return {
        loading: true,
        orderDetail: [],
      };
    case actionTypes.GET_ORDERS_DETAILS_SUCCESS: {
      // console.log("ind detail success");
      return {
        loading: false,
        orderDetail: action.payload,
      };
    }
    case actionTypes.GET_ORDERS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderState = {
  orders: []
};

export const orderReducer = (state, action) => {
  switch (action.type) {
    case "fetchOrderAndChangeState":
      return {
        ...state,
        orders: action.payload
      };
    default:
      return state;
  }
};

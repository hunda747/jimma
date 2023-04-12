import React, { Fragment, createContext, useReducer } from "react";
import { orderState, orderReducer } from "./ordersContext";
import Orders from "./orders";

export const OrderContext = createContext("");

export default function OrdersIndex(params) {
  const [data, dispatch] = useReducer(orderReducer, orderState);
  // console.log(data);

  return (
    <Fragment>
      <OrderContext.Provider value={{ data, dispatch }}>
        <Orders />
      </OrderContext.Provider>
    </Fragment>
  );
}

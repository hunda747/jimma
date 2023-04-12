import React, { Fragment, createContext, useReducer } from "react";
import { foodState, editFoodReducer } from "./foodContext";
import ProductList from "./productList";

export const EditFoodContext = createContext("");

export default function ProductListIndex({ onMorePage }) {
  const [data, dispatch] = useReducer(editFoodReducer, foodState);
  // console.log(data);

  return (
    <Fragment>
      <EditFoodContext.Provider value={{ data, dispatch }}>
        <ProductList onMorePage={onMorePage} />
      </EditFoodContext.Provider>
    </Fragment>
  );
}

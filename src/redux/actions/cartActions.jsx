import * as actionType from "../constants/cartConstant";
import axios from "axios";
import * as api from "../api/index";

export const addToCart =
  (id, food_name, price, qtyCounter, restaurant) =>
  async (dispatch, getState) => {
    console.log(restaurant);
    dispatch({
      type: actionType.ADD_TO_CART,
      payload: {
        id,
        food_name,
        price,
        qtyCounter,
        restaurant,
      },
    });

    //store the cartItem in the localstorage to save in case of refreshed page or changed tab screen
    localStorage.setItem(
      "toloDeliverycart",
      JSON.stringify(getState().cart.cartItems)
    );
    // localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
  };

export const subtractFromCart =
  (id, food_name, price, qtyCounter) => async (dispatch, getState) => {
    // const {data} = await api.fetchProductsById(id);
    console.log(id);
    console.log(food_name);
    console.log("comming from  add to cart action");
    // console.log(data);
    console.log(qtyCounter, " is the ammount being added to cart");
    // console.log(data[0].productBrand);

    dispatch({
      type: actionType.ADD_TO_CART,
      payload: {
        id,
        food_name,
        price,
        qtyCounter,
      },
    });

    //store the cartItem in the localstorage to save in case of refreshed page or changed tab screen
    localStorage.setItem(
      "toloDeliverycart",
      JSON.stringify(getState().cart.cartItems)
    );
    // localStorage.setItem('toloDeliverycart', JSON.stringify(getState().cart.cartItems));
  };

export const changeToCart = (id, qtyCounter) => async (dispatch, getState) => {
  // const {data} = await api.fetchProductsById(id);
  console.log(id);
  console.log("comming from  change to cart action");
  // console.log(data);
  console.log(qtyCounter, " is the ammount being added to cart");
  // console.log(data[0].productBrand);

  dispatch({
    type: actionType.CHANGE_TO_CART,
    payload: {
      id,
      qtyCounter,
    },
  });

  //store the cartItem in the localstorage to save in case of refreshed page or changed tab screen
  localStorage.setItem(
    "toloDeliverycart",
    JSON.stringify(getState().cart.cartItems)
  );
  // localStorage.setItem('toloDeliverycart', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionType.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem(
    "toloDeliverycart",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: actionType.CART_RESET,
  });
  localStorage.setItem(
    "toloDeliverycart",
    JSON.stringify(getState().cart.cartItems)
  );
};

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import rootReducer from './reducers';

import { getUserReducer } from "./reducers/userReducer";
import { getFoodReducer } from "./reducers/foodReducer";
import { getRestaurantReducer } from "./reducers/restaurantReducer";
import { getOrdersReducer } from "./reducers/orderReducer";
import { getOrderDetailReducer } from "./reducers/orderDetailReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  user: getUserReducer,
  food: getFoodReducer,
  restaurant: getRestaurantReducer,
  order: getOrdersReducer,
  orderDetail: getOrderDetailReducer,
  cart: cartReducer,
});

const middleware = [thunk];
const cartFromLocalStorage = localStorage.getItem("toloDeliverycart")
  ? JSON.parse(localStorage.getItem("toloDeliverycart"))
  : [];

const initialState = {
  cart: {
    cartItems: cartFromLocalStorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

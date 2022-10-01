import { createStore, combineReducers , applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './reducers';

import {getUserReducer} from './reducers/userReducer';
import {getFoodReducer} from './reducers/foodReducer';
import {getRestaurantReducer} from './reducers/restaurantReducer';
import {getOrdersReducer} from './reducers/orderReducer';
import {cartReducer} from './reducers/cartReducer'


const reducer = combineReducers({
  user: getUserReducer,
  food: getFoodReducer,
  restaurant: getRestaurantReducer,
  order: getOrdersReducer,
  cart: cartReducer
})

const middleware = [thunk];
const cartFromLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []

const initialState = {
  cart:{
    cartItems: cartFromLocalStorage
  },
};

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
import axios from "axios";
import { getOrdersInprogress } from "../actions/orderActions";

// axios.defaults.withCredentials = true;
axios.create({ withCredentials: true });

const localhost = "http://tolodeliveryjimma.com/";
// const localhost = "http://localhost:5000/";
// const localhost = 'https://jimma-e-comm.herokuapp.com/';

// user
const addUserByPhone = localhost + "api/user/addUserByPhone";
const getUsers = localhost + "api/user/getUsers";
const getUser = localhost + "api/user/getUser";
const resetPassword = localhost + "api/user/resetPassword";

// order
const addOrder = localhost + "api/order/addOrder";
const getOrders = localhost + "api/order/getOrders";
const getInprogressOrders = localhost + "api/order/getInprogressOrders";
const getPendingOrders = localhost + "api/order/getPendingOrders";
const getCompleteOrders = localhost + "api/order/getCompleteOrders";
const getCompleteOrdersByDate = localhost + "api/order/getCompleteOrdersByDate";
const getOrdersbyId = localhost + "api/order/getOrdersbyId";
const changeStatus = localhost + "api/order/changeStatus";
const getOrdersbyUser = localhost + "api/order/getOrdersbyUser";
const changeStatusComplete = localhost + "api/order/changeStatusComplete";
const changeStatusAccept = localhost + "api/order/changeStatusAccept";

// food
const addFood = localhost + "api/food/addFood";
const getAllFoods = localhost + "api/food/getAllFood";
const getFoodsByRestaurant = localhost + "api/food/getFoodsByRestaurant";
const getAllFoodsByRestaurant = localhost + "api/food/getAllFoodsByRestaurant";
const updateFood = localhost + "api/food/updateFood";
const searchFood = localhost + "api/food/searchFood";

// Restaurant
const getAllRestaurant = localhost + "api/restaurant/getAllRestaurant";
const getRestaurant = localhost + "api/restaurant/getRestaurant";
const getRestaurantById = localhost + "api/restaurant/getRestaurantById";
const addRestaurant = localhost + "api/restaurant/addRestaurant";
const updateRestaurant = localhost + "api/restaurant/updateRestaurant";

// order details
const getOrderDetail = localhost + "api/orderDetail/getOrdersDetails";

export const createUser = (fname, lname, phone, password) => {
  return axios.post(addUserByPhone, {
    fname: fname,
    lname: lname,
    phone: phone,
    password: password,
  });
};

export const createFood = (food_name, description, type, restaurant, price) => {
  return axios.post(addFood, {
    food_name: food_name,
    description: description,
    type: type,
    restaurant: restaurant,
    price: price,
  });
};

export const changeFood = (food_name, description, type, id, price, status) => {
  return axios.post(updateFood, {
    food_name: food_name,
    description: description,
    type: type,
    id: id,
    price: price,
    status: status,
  });
};

export const createRestaurant = (
  name,
  description,
  rating,
  open_days,
  working_hour,
  img,
  status
) => {
  return axios.post(addRestaurant, {
    name,
    description,
    rating,
    open_days,
    working_hour,
    img,
    status,
  });
};

export const changeRestaurant = (
  name,
  description,
  rating,
  open_days,
  working_hour,
  img,
  id,
  status
) => {
  return axios.post(updateRestaurant, {
    name,
    description,
    rating,
    open_days,
    working_hour,
    img,
    id,
    status,
  });
};

export const createOrder = (
  date,
  userId,
  total,
  latitude,
  longitude,
  contact,
  no_item,
  orders,
  address
) => {
  return axios.post(addOrder, {
    date: date,
    userId: userId,
    total: total,
    latitude: latitude,
    longitude: longitude,
    contact: contact,
    no_item: no_item,
    orders: orders,
    address: address,
  });
};

export const changeOrderStatus = (id, status) => {
  return axios.post(changeStatus, { id: id, status: status });
};

export const fetchOrdersbyUser = (id) => {
  return axios.post(getOrdersbyUser, { id: id });
};

export const fetchOrder = () => {
  return axios.post(getOrders);
};

export const fetchOrdersInprogress = () => {
  return axios.post(getInprogressOrders);
};

export const fetchOrdersPending = () => {
  return axios.post(getPendingOrders);
};

export const fetchOrdersComplete = (token) => {
  const config = {
    headers: {
      Authorization: "Bearer",
      // header2: value2
    },
  };
  console.log(token);
  return axios.post(getCompleteOrders, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchOrdersById = (id) => {
  return axios.post(getOrdersbyId, { id: id });
};

export const fetchUsers = () => {
  return axios.post(getUsers);
};

export const fetchRestaurants = () => {
  return axios.get(getAllRestaurant);
};

export const fetchAllRestaurants = () => {
  return axios.get(getRestaurant);
};

export const fetchRestaurantById = (id) => {
  return axios.post(getRestaurantById, {
    id: id,
  });
};

export const fetchFoods = () => {
  return axios.get(getAllFoods);
};

export const fetchFoodsBySearch = (food) => {
  return axios.post(searchFood, { food: food });
};

export const fetchFoodsByRestaurant = (restaurant) => {
  return axios.post(getFoodsByRestaurant, {
    restaurant: restaurant,
  });
};

export const fetchAllFoodsByRestaurant = (restaurant) => {
  return axios.post(getAllFoodsByRestaurant, {
    restaurant: restaurant,
  });
};

export const fetchOrderDetail = (id) => {
  console.log(id);
  return axios.post(getOrderDetail, { id: id });
};

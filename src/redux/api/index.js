import axios from 'axios';
import { getOrdersInprogress } from '../actions/orderActions';

// axios.defaults.withCredentials = true;
axios.create({ withCredentials: true, })

// const localhost = 'http://localhost:5000/';
const localhost = 'https://jimma-e-comm.herokuapp.com/';

// user
const addUserByPhone = localhost + "api/addUserByPhone";
const getUsers = localhost + "api/getUsers";
const getUser = localhost + "api/getUser";

// order
const addOrder = localhost + "api/addOrder"
const getOrders = localhost + "api/getOrders";
const getInprogressOrders = localhost + "api/getInprogressOrders";
const getPendingOrders = localhost + "api/getPendingOrders";
const getCompleteOrders = localhost + "api/getCompleteOrders";
const getCompleteOrdersByDate = localhost + "api/getCompleteOrdersByDate";
const getOrdersbyId = localhost + "api/getOrdersbyId";
const changeStatus = localhost + "api/changeStatus";
const changeStatusComplete = localhost + "api/changeStatusComplete";
const changeStatusAccept = localhost + "api/changeStatusAccept";

// food
const addFood = localhost + "api/addFood";
const getAllFoods = localhost + "api/getAllFoods";
const getFoodsByRestaurant = localhost + "api/getFoodsByRestaurant";
const updateFood = localhost + "api/updateFood";
const searchFood = localhost + "api/searchFood";

// Restaurant
const getAllRestaurant = localhost + "api/getAllRestaurant";
const getRestaurantById = localhost + "api/getRestaurantById";
const addRestaurant = localhost + "api/addRestaurant";
const updateRestaurant = localhost + "api/updateRestaurant";


export const createUser = (fname,lname,phone, password) => {
  return axios.post(addUserByPhone, {
    fname: fname,
    lname: lname,
    phone: phone, 
    password: password
  })
}

export const createFood = (food_name,description,type,restaurant,price) => {
  return axios.post(addFood, {
    food_name: food_name,
    description: description,
    type: type,
    restaurant: restaurant,
    price: price
  })
}

export const changeFood = (food_name,description,type,id,price) => {
  return axios.post(updateFood, {
    food_name: food_name,
    description: description,
    type: type,
    id: id,
    price: price
  })
}

export const createRestaurant = (name, description, rating, open_days, working_hour, img) => {
  return axios.post(addRestaurant, {
    name, description, rating, open_days, working_hour, img
  })
}

export const changeRestaurant = (name, description, rating, open_days, working_hour, img, id) => {
  return axios.post(updateRestaurant, {
    name, description, rating, open_days, working_hour, img, id
  })
}

export const createOrder = (date,userId,total,latitude ,longitude,contact,no_item,orders,address) => {
  return axios.post(addOrder, {
    date: date,
    userId: userId,
    total: total,
    latitude: latitude,
    longitude: longitude,
    contact: contact,
    no_item: no_item,
    orders: orders,
    address: address
  })
}


export const fetchOrder = () =>{
  return axios.post(getOrders);
}

export const fetchOrdersInprogress = () =>{
  return axios.post(getInprogressOrders);
}

export const fetchOrdersPending = () =>{
  return axios.post(getPendingOrders);
}

export const fetchOrdersComplete = () =>{
  return axios.post(getCompleteOrders);
}

export const fetchOrdersById = (id) =>{
  return axios.post(getOrdersbyId, {id: id});
}



export const fetchUsers = () =>{
  return axios.post(getUsers);
}

export const fetchRestaurants = () =>{
  return axios.get(getAllRestaurant);
}

export const fetchRestaurantById = (id) =>{
  return axios.post(getRestaurantById, {
    id: id
  });
}

export const fetchFoods = () =>{
  return axios.get(getAllFoods);
}

export const fetchFoodsBySearch = (food) =>{
  return axios.post(searchFood, {food: food});
}

export const fetchFoodsByRestaurant = (restaurant) =>{
  return axios.post(getFoodsByRestaurant, {
    restaurant: restaurant
  });
}

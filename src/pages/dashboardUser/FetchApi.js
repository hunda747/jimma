import axios from "axios";
const apiURL = "https://jimma-e-comm.herokuapp.com/";

export const getUserById = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/signle-user`, { uId });
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

export const updatePersonalInformationFetch = async (userData) => {
  try {
    let res = await axios.post(`${apiURL}/api/edit-user`, userData);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

export const getOrderByUser = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/order-by-user`, { uId });
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

export const updatePassword = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/change-password`, formData);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

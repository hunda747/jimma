import axios from "axios";
// const localhsots = "http://localhost:5000/";
const localhost = process.env.REACT_APP_BASE_URL;
// const localhsots = "http://tolodeliveryjimma.com/";
export const fetchPending = async (dispatch, setLoader) => {
  setLoader(true);
  axios
    .post(localhost + "/api/order/getPendingOrders")
    .then((res) => {
      // console.log(res);
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err);
    })
    .finally(() => {
      setLoader(false);
    });
};

export const fetchInprogress = async (dispatch, setLoader) => {
  setLoader(true);
  axios
    .post(localhost + "/api/order/getInprogressOrders")
    .then((res) => {
      // console.log(res);
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err);
    })
    .finally(() => {
      setLoader(false);
    });
};

export const fetchComplete = async (dispatch, setLoader) => {
  setLoader(true);
  const selectedDate = new Date().toISOString().slice(0, 10);
  // console.log(selectedDate);
  axios
    .post(localhost + "/api/order/getCompleteOrdersByDate", {
      date: selectedDate,
    })
    .then((res) => {
      // console.log(res);
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err);
    })
    .finally(() => {
      setLoader(false);
    });
};

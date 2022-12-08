// import { useNavigate } from "react-router-dom";
import axios from "axios";

export const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("toloDeliverycart");
  localStorage.removeItem("wishList");
  window.location.href = "/";
};

// export const fetchData = async (dispatch) => {
//   dispatch({ type: "loading", payload: true });
//   let userId = JSON.parse(localStorage.getItem("jwt"))
//     ? JSON.parse(localStorage.getItem("jwt")).user._id
//     : "";
//   try {
//     let responseData = await getUserById(userId);
//     setTimeout(() => {
//       if (responseData && responseData.User) {
//         dispatch({ type: "userDetails", payload: responseData.User });
//         dispatch({ type: "loading", payload: false });
//       }
//     }, 500);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchOrderByUser = async (dispatch) => {
//   dispatch({ type: "loading", payload: true });
//   let userId = JSON.parse(localStorage.getItem("jwt"))
//     ? JSON.parse(localStorage.getItem("jwt")).user._id
//     : "";
//   try {
//     let responseData = await getOrderByUser(userId);
//     setTimeout(() => {
//       if (responseData && responseData.Order) {
//         console.log(responseData);
//         dispatch({ type: "OrderByUser", payload: responseData.Order });
//         dispatch({ type: "loading", payload: false });
//       }
//     }, 500);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updatePersonalInformationAction = async (dispatch, fData) => {
//   const formData = {
//     uId: fData.id,
//     name: fData.name,
//     phoneNumber: fData.phone,
//   };
//   dispatch({ type: "loading", payload: true });
//   try {
//     let responseData = await updatePersonalInformationFetch(formData);
//     setTimeout(() => {
//       if (responseData && responseData.success) {
//         dispatch({ type: "loading", payload: false });
//         fetchData(dispatch);
//       }
//     }, 500);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const handleChangePassword = async (fData, setFdata, phone) => {
  const apiURL = process.env.REACT_APP_BASE_URL;
  // const navigate = useNavigate();
  if (!fData.newPassword || !fData.oldPassword || !fData.confirmPassword) {
    setFdata({
      ...fData,
      error: "Please provide your all password and a new password",
    });
  } else if (fData.newPassword !== fData.confirmPassword) {
    setFdata({ ...fData, error: "Password does't match" });
  } else {
    try {
      let responseData = await axios.post(apiURL + "/api/resetPassword", {
        phone: phone,
        oldPassword: fData.oldPassword,
        newPassword: fData.confirmPassword,
      });
      if (responseData && responseData.status === 200) {
        setFdata({
          ...fData,
          success: responseData.success,
          error: "success",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        // navigate('/');
        // dispatch({ type: "loading", payload: false });
      } else if (responseData.error) {
        // dispatch({ type: "loading", payload: false });
        setFdata({
          ...fData,
          error: responseData.error,
          success: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setFdata({ ...fData, error: "No Server Response" });
      } else if (err.response?.status === 400) {
        setFdata({ ...fData, error: "Username not found" });
      } else if (err.response?.status === 401) {
        setFdata({ ...fData, error: "Incorrect password" });
      }
    }
  }
};

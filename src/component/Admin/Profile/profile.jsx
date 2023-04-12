import React, { useState, useEffect, useRef } from "react";
import "./profile.css";

import { useDispatch, useSelector, useSelectore } from "react-redux";
// import { changeAdminUserName } from '../../../redux/actions/userActions'
// import { changeAdminPassword} from '../../../redux/actions/userActions';
// import { createAdminAccount } from '../../../redux/actions/userActions';
import { message } from "antd";

// for the input hider
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//for the input hider
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Profile({ userName, email, role, signUpDate }) {
  const apiURL = process.env.REACT_APP_BASE_URL;
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errRef = useRef();

  //error message
  const [errMsg, setErrMsg] = useState("");
  const [addAccErr, setAddAccErr] = useState("");

  // state to get the account information
  const [userInfoState, setUserInfoState] = useState({
    userName: userName,
    userNameNew: "",
    role: role,
    SignUpDate: signUpDate,
  });
  // state to  change password
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // state to add another account
  const [newAccount, setNewAccount] = useState({
    userName: "",
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: "",
  });

  const handleLogout = () => {
    // e.preventDefault();
    removeCookie("toloDAMusername", { path: "/" });
    removeCookie("toloDAMrole", { path: "/" });
    removeCookie("toloDAMid", { path: "/" });
    removeCookie("toloDADaccess_token", { path: "/" });
    navigate("/adminLogin");
  };

  // const data = useSelector((state)=> state.getUser);
  // const {user , loading , error} = data
  const loading = false;
  const error = false;

  // // console.log(user)

  const userNameChangeHandler = async () => {
    // console.log(userInfoState);
    //dispatch(changeAdminUserName(email,userName))
    // if(window.confirm("Are you sure you want to change User Name")){
    const res = await axios.post(apiURL + "/api/admin/changeAdminUserName", {
      userNameOld: userInfoState.userName,
      userNameNew: userInfoState.userNameNew,
    });
    // console.log(res.data);
    if (res.data.status === 200) {
      message.success({
        content: "UserName changed successfully",
        style: {
          marginTop: "10vh",
        },
      });
    } else {
      message.error({
        content: res.data.message,
        style: {
          marginTop: "10vh",
        },
      });
    }
    //    // dispatch(changeAdminUserName(email, userName))
    //    window.location.reload(false);
    // }else{
    // message.error("sorry user name change faild")
    // }
  };

  const passwordChangeHandler = async () => {
    if (passwordChange.newPassword !== passwordChange.confirmNewPassword) {
      message.error({
        content: "Passwords Dont Match!",
        style: {
          marginTop: "10vh",
        },
      });
    } else if (passwordChange.newPassword.length < 6) {
      message.error({
        content: "Password too Short",
        style: {
          marginTop: "10vh",
        },
      });
    } else {
      try {
        const response = await axios.post(
          apiURL + "/api/admin/changeAdminPassword",
          {
            username: userInfoState.userName,
            oldPassword: passwordChange.oldPassword,
            newPassword: passwordChange.newPassword,
          }
        );
        // console.log(response);
        if (response.data.status === 402) {
          setErrMsg("Invalid Old Password");
          message.error({
            content: "Invalid Old Password",
            style: {
              marginTop: "10vh",
            },
          });
          // console.log("im getting the error msg here " + errMsg);
        } else if (response.data.status === 404) {
          setErrMsg("User Not Found");
          message.error({
            content: "User Not Found",
            style: {
              marginTop: "10vh",
            },
          });
        } else if (response.data.status === 200) {
          message.success({
            content: "Password Changed Successfully",
            style: {
              marginTop: "10vh",
            },
          });
          setTimeout(() => {
            handleLogout();
          }, 3000);
          // window.location.reload(true);
        }
      } catch (err) {
        // console.log(err);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 404) {
          setErrMsg("User Not Found");
        } else if (err.response?.status === 402) {
          setErrMsg("Password Change Failed");
        }
      }
      // if(window.confirm("Are you sure you want to change Password")){
      //     // dispatch(changeAdminPassword(userInfoState.email , passwordChange.oldPassword , passwordChange.newPassword))
      //      message.success("Password Changed Successfully")
      //      window.location.reload(false);
      // }else{
      //     message.error("Password Change Failed")
      // }
    }
  };

  const handleAccountCreate = async () => {
    // if(newAccount.userName === '' || newAccount.email === '' || newAccount.confirm_email=== '' || newAccount.password === '' || newAccount.confirm_password===''){
    //     //message.error("Missing inputs , check you input")
    //     setAddAccErr("Missing Inputs")
    // }else if(! /^(?=.{4})[a-z]([_]?[a-z\d]+)*$/i.test(newAccount.userName)){
    //     setAddAccErr("Invalid UserName, must contain more than 3 characters (_)")
    // }else if(newAccount.email !== newAccount.confirm_email){
    //     setAddAccErr("Emails Dont Match")
    // }else if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newAccount.email)){
    //     setAddAccErr("Invalid Email")
    // }
    // else if(newAccount.password !== newAccount.confirm_password){
    //     setAddAccErr("Passwords Dont Match")
    // }else if(newAccount.password.length < 6){
    //     setAddAccErr("Password Must Be Greater Than 6 Characters")
    // }else{
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/createAdminAccount', {
    //             name: newAccount.userName,
    //             email: newAccount.email,
    //             password: newAccount.password
    //         })
    //         // console.log(response)
    //        // dispatch(createAdminAccount(newAccount.userName, newAccount.email , newAccount.password))
    //         if(response.data.status === 400){
    //             // message.error(user.message)
    //             setAddAccErr(response.data.message);
    //         }else if(response.data.status === 401){
    //            // message.error(user.message)
    //             setAddAccErr(response.data.message);
    //         }else if(response.data.status === 200){
    //             window.location.reload(false);
    //             message.success("Account Created");
    //         }
    //     } catch (err) {
    //         // console.log(err);
    //         if (!err?.response) {
    //             setAddAccErr('No Server Response');
    //         } else if (err.response?.status === 401) {
    //             setAddAccErr("Error while creating Account");
    //         } else if (err.response?.status === 400) {
    //             setAddAccErr('Email Already In Use');
    //         }
    //     }
    // }
  };

  return (
    <div className="profilePage">
      <div className="profileWrapper">
        <div className="profileInfo_Holder">
          <div className="profileIconContainer">
            <AccountCircleIcon />
          </div>
          <div className="profileBodyContainer">
            <p>
              UserName :{" "}
              {userInfoState.userName ? userInfoState.userName : "Unavailable"}
            </p>
            <p>
              Role :{" "}
              {userInfoState.role === "admin"
                ? "Administration"
                : "Product Manager"}
            </p>
            <p>
              SignUp Date :{" "}
              {userInfoState.SignUpDate
                ? userInfoState.SignUpDate
                : "Unavailable"}
            </p>
          </div>
        </div>

        <div className="changeUserNameHolder">
          <div className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  <h3>Edit UserName</h3>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="changeUserNameSide">
                    <input
                      type="text"
                      placeholder={userInfoState.userName}
                      className="userNameInput"
                      value={userInfoState.userName}
                      onChange={(e) =>
                        setUserInfoState({
                          ...userInfoState,
                          userName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="New username"
                      className="userNameInput"
                      value={userInfoState.userNameNew}
                      onChange={(e) =>
                        setUserInfoState({
                          ...userInfoState,
                          userNameNew: e.target.value,
                        })
                      }
                    />

                    <button
                      className="userNameChangeBtn"
                      onClick={userNameChangeHandler}
                    >
                      Change
                    </button>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className="changePasswordHolder">
          <div className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  <h3>Change Password</h3>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p
                    ref={errRef}
                    className={errMsg ? "loginErrMsg" : "login_offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <div className="changePasswordSide">
                    <input
                      type="password"
                      placeholder="Old password"
                      name="old_password"
                      id="old_password"
                      className="old_password_input"
                      value={passwordChange.oldPassword}
                      autocomplete="false"
                      onChange={(e) =>
                        setPasswordChange({
                          ...passwordChange,
                          oldPassword: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="new_password_input"
                      value={passwordChange.newPassword}
                      onChange={(e) =>
                        setPasswordChange({
                          ...passwordChange,
                          newPassword: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Confirm new Password"
                      className="confirm_new_password_input"
                      value={passwordChange.confirmNewPassword}
                      onChange={(e) =>
                        setPasswordChange({
                          ...passwordChange,
                          confirmNewPassword: e.target.value,
                        })
                      }
                    />

                    <button
                      className="passwordChangeConfirm"
                      onClick={passwordChangeHandler}
                    >
                      Confirm
                    </button>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        {userInfoState.role === "admin" ? (
          <div className="addNewAdminHolder">
            {/* <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  <h3>Add new Admin Account</h3>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p
                    ref={errRef}
                    className={addAccErr ? "loginErrMsg" : "login_offscreen"}
                    aria-live="assertive"
                  >
                    {addAccErr}
                  </p>
                  <div className="addAdminWrapper">
                    <input
                      type="text"
                      placeholder="UserName"
                      className="another_account_userName_input"
                      value={newAccount.userName}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          userName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="another_account_email_input"
                      value={newAccount.email}
                      onChange={(e) =>
                        setNewAccount({ ...newAccount, email: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Confirm Email"
                      className="another_account_confirm_email_input"
                      value={newAccount.confirm_email}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          confirm_email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="another_account_password_input"
                      value={newAccount.password}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          password: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="another_account_confirm_password_input"
                      value={newAccount.confirm_password}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          confirm_password: e.target.value,
                        })
                      }
                    />
                    <button
                      className="addAnotherAccountBtn"
                      onClick={handleAccountCreate}
                    >
                      Create Account
                    </button>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

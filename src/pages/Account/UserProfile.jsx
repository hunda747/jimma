import React, { Fragment, useContext, useState, useEffect } from "react";
// import Layout from "./Layout";
// import { DashboardUserContext } from "./Layout";
// import { updatePersonalInformationAction } from "./Action";
import { useCookies } from "react-cookie";

import { handleChangePassword } from "./Action";

import classes from "./account.module.scss";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const ProfileComponent = () => {
  // const { data, dispatch } = useContext(DashboardUserContext);
  // const userDetails = data.userDetails !== null ? data.userDetails : "";

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userDetails = {
    _id: 12,
    fname: cookies.ToleDUfname,
    lname: cookies.ToleDUlname,
    phone: cookies.ToleDUphoneNo,
  };

  const [fData, setFdata] = useState({
    id: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    success: false,
  });

  useEffect(() => {
    setFdata({
      ...fData,
      id: userDetails._id,
      fname: userDetails.fname,
      lname: userDetails.lname,
      email: userDetails.email,
      phone: userDetails.phone,
    });
  }, []);

  const handleSubmit = () => {
    // console.log(fData);
  };

  //for password

  const [fPData, setFPdata] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    success: false,
    error: false,
    passwordView: false,
    type: "password",
  });

  if (fPData.success || fPData.error) {
    setTimeout(() => {
      setFPdata({ ...fPData, success: false, error: false });
    }, 2000);
  }

  return (
    <>
      <div className={classes.profile}>
        <div className={classes.profile__profileDetail}>
          <div className={classes.profile__profileDetail__header}>
            <span>
              <EditOutlinedIcon />
            </span>
            <p>Edit Profile Info</p>
          </div>
          {fData.success ? (
            <>
              <p>{fData.success}</p>
            </>
          ) : (
            <></>
          )}
          <div className={classes.profile__profileDetail__inputs}>
            <input
              type="text"
              onChange={(e) => setFdata({ ...fData, fname: e.target.value })}
              value={fData.fname}
            />
            <input
              type="text"
              onChange={(e) => setFdata({ ...fData, lname: e.target.value })}
              value={fData.lname}
            />
            <input
              onChange={(e) => setFdata({ ...fData, phone: e.target.value })}
              value={fData.phone}
              type="number"
            />
            <button onClick={(e) => handleSubmit()}>Update</button>
          </div>
        </div>
        <div className={classes.profile__password}>
          <div className={classes.profile__password__header}>
            <span>
              <EditOutlinedIcon />
            </span>
            <p>Edit Password</p>
          </div>

          {fPData.success ? (
            <div className={classes.profile__password__successMsg}>
              {fPData.success}
            </div>
          ) : (
            ""
          )}
          {fPData.error ? (
            <div className={classes.profile__password__errorMsg}>
              {fPData.error}
            </div>
          ) : (
            ""
          )}

          <div className={classes.profile__password__inputs}>
            <input
              type="password"
              onChange={(e) =>
                setFPdata({ ...fPData, oldPassword: e.target.value })
              }
              value={fPData.oldPassword}
              placeholder="Old Passord"
            />
            <input
              onChange={(e) =>
                setFPdata({ ...fPData, newPassword: e.target.value })
              }
              value={fPData.newPassword}
              type="password"
              placeholder="New Password"
            />
            <input
              onChange={(e) =>
                setFPdata({ ...fPData, confirmPassword: e.target.value })
              }
              value={fPData.confirmPassword}
              type="password"
              placeholder="Confirm New Password"
            />
            <button
              onClick={(e) =>
                handleChangePassword(fPData, setFPdata, cookies.ToleDUphoneNo)
              }
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>

    //       <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
    //         <div className="shadow-lg border">
    //           <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
    //             Personal Information
    //           </div>
    //           <hr />
    //           <div className="py-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
    //             {fData.success ? (
    //               <div className="bg-green-200 px-4 py-2 rounded">
    //                 {fData.success}
    //               </div>
    //             ) : (
    //               ""
    //             )}
    //             <div className="flex flex-col space-y-2">
    //               <label htmlFor="name">Name</label>
    //               <input
    //                 onChange={(e) => setFdata({ ...fData, name: e.target.value })}
    //                 value={fData.name}
    //                 type="text"
    //                 id="name"
    //                 className="border px-4 py-2 w-full focus:outline-none"
    //               />
    //             </div>
    //             <div className="flex flex-col space-y-2">

    //             </div>
    //             <div className="flex flex-col space-y-2">
    //               <label htmlFor="number">Phone Number</label>
    //               <input
    //                 onChange={(e) => setFdata({ ...fData, phone: e.target.value })}
    //                 readOnly
    //                 value={fData.phone}
    //                 type="number"
    //                 id="number"
    //                 className="border px-4 py-2 w-full focus:outline-none"
    //               />
    //               <span className="text-xs text-gray-500">
    //                 You can't change your email
    //               </span>
    //             </div>
    //             <div
    //               onClick={(e) => handleSubmit()}
    //               style={{ background: "#303031" }}
    //               className="w-full text-center cursor-pointer px-4 py-2 text-gray-100"
    //             >
    //               Update Information
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   );
    // };

    // const SettingComponent = () => {

    //   const [fPData, setFPdata] = useState({
    //     oldPassword: "",
    //     newPassword: "",
    //     confirmPassword: "",
    //     success: false,
    //     error: false,
    //     passwordView: false,
    //     type: "password",
    //   });
    // 	const [cookies, setCookie] = useCookies(['user']);

    //   if (fPData.success || fPData.error) {
    //     setTimeout(() => {
    //       setFPdata({ ...fPData, success: false, error: false });
    //     }, 2000);
    //   }

    //   return (
    //     <Fragment>
    //       <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
    //         <div className="shadow-lg border">
    //           <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
    //             Change Password
    //           </div>
    //           {
    //             fPData.error ?
    //             // console.log(fPData.error) : ""
    //           }
    //           <hr />
    //           <div className="py-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
    //             {fPData.success ? (
    //               <div className="bg-green-200 px-4 py-2 rounded">
    //                 {fPData.success}
    //               </div>
    //             ) : (
    //               ""
    //             )}
    //             {fPData.error ? (
    //               <div className="bg-red-200 px-4 py-2 rounded">{fPData.error}</div>
    //             ) : (
    //               ""
    //             )}
    //             <div className="flex flex-col space-y-2">
    //               <label htmlFor="oldPassword">Old Password</label>
    //               <div className="relative">
    //                 <input
    //                   onChange={(e) =>
    //                     setFPdata({ ...fPData, oldPassword: e.target.value })
    //                   }
    //                   value={fPData.oldPassword}
    //                   type={fPData.type}
    //                   id="oldPassword"
    //                   className="z-10 border px-4 py-2 w-full focus:outline-none"
    //                 />
    //                 <span
    //                   onClick={(e) =>
    //                     setFPdata({
    //                       ...fPData,
    //                       passwordView: false,
    //                       type: "password",
    //                     })
    //                   }
    //                   className={`${
    //                     fPData.passwordView ? "" : "hidden"
    //                   } absolute right-0 m-2 box-border cursor-pointer`}
    //                 >

    //                 </span>
    //                 <span
    //                   onClick={(e) =>
    //                     setFPdata({ ...fPData, passwordView: true, type: "text" })
    //                   }
    //                   className={`${
    //                     !fPData.passwordView ? "" : "hidden"
    //                   } absolute right-0 m-2 box-border cursor-pointer`}
    //                 >

    //                 </span>
    //               </div>
    //             </div>
    //             <div className="flex flex-col space-y-2">
    //               <label htmlFor="newPassword">New Password</label>
    //               <input
    //                 onChange={(e) =>
    //                   setFPdata({ ...fPData, newPassword: e.target.value })
    //                 }
    //                 value={fPData.newPassword}
    //                 type="password"
    //                 id="newPassword"
    //                 className="border px-4 py-2 w-full focus:outline-none"
    //               />
    //             </div>
    //             <div className="flex flex-col space-y-2">
    //               <label htmlFor="confirmPassword">Confirm Password</label>
    //               <input
    //                 onChange={(e) =>
    //                   setFPdata({ ...fPData, confirmPassword: e.target.value })
    //                 }
    //                 value={fPData.confirmPassword}
    //                 type="password"
    //                 id="confirmPassword"
    //                 className="border px-4 py-2 w-full focus:outline-none"
    //               />
    //             </div>
    //             <div

    //               onClick={(e) => handleChangePassword(fPData, setFPdata, cookies.ToleDUphoneNo)}
    //               style={{ background: "#303031" }}
    //               className="w-full text-center cursor-pointer px-4 py-2 text-gray-100"
    //             >
    //               Change password
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </Fragment>
    //   );
    // };

    // const UserProfile = (props) => {
    //   return (
    //     <>
    //       <ProfileComponent />
    //       <SettingComponent />
    //     </>
  );
};

export default ProfileComponent;

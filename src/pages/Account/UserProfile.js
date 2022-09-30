import React, { Fragment, useContext, useState, useEffect } from "react";
// import Layout from "./Layout";
// import { DashboardUserContext } from "./Layout";
// import { updatePersonalInformationAction } from "./Action";
import { useCookies } from "react-cookie";

import { handleChangePassword } from "./Action";

const ProfileComponent = () => {
  // const { data, dispatch } = useContext(DashboardUserContext);
  // const userDetails = data.userDetails !== null ? data.userDetails : "";
  const userDetails = {
    _id: 12,
    name: "Hunda",
    email: "hnda",
    phone: "0977"
  }

  const [fData, setFdata] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    success: false,
  });

  useEffect(() => {
    setFdata({
      ...fData,
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phoneNumber,
    });

    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    console.log(fData);
  };

  // if (data.loading) {
  //   return (
  //     <div className="w-full md:w-9/12 flex items-center justify-center ">
  //       <svg
  //         className="w-12 h-12 animate-spin text-gray-600"
  //         fill="none"
  //         stroke="currentColor"
  //         viewBox="0 0 24 24"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           strokeWidth="2"
  //           d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  //         ></path>
  //       </svg>
  //     </div>
  //   );
  // }

  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="shadow-lg border">
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
            Personal Information
          </div>
          <hr />
          <div className="py-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
            {fData.success ? (
              <div className="bg-green-200 px-4 py-2 rounded">
                {fData.success}
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setFdata({ ...fData, name: e.target.value })}
                value={fData.name}
                type="text"
                id="name"
                className="border px-4 py-2 w-full focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              {/* <label htmlFor="email">Email</label>
              <input
                value={fData.email}
                readOnly
                type="email"
                id="email"
                className="cursor-not-allowed border px-4 py-2 bg-gray-200 w-full focus:outline-none focus:cursor-not-allowed"
              />
              <span className="text-xs text-gray-500">
                You can't change your email
              </span> */}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="number">Phone Number</label>
              <input
                onChange={(e) => setFdata({ ...fData, phone: e.target.value })}
                readOnly
                value={fData.phone}
                type="number"
                id="number"
                className="border px-4 py-2 w-full focus:outline-none"
              />
              <span className="text-xs text-gray-500">
                You can't change your email
              </span>
            </div>
            <div
              onClick={(e) => handleSubmit()}
              style={{ background: "#303031" }}
              className="w-full text-center cursor-pointer px-4 py-2 text-gray-100"
            >
              Update Information
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const SettingComponent = () => {
  // const { data, dispatch } = useContext(DashboardUserContext);

  const [fPData, setFPdata] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    success: false,
    error: false,
    passwordView: false,
    type: "password",
  });
	const [cookies, setCookie] = useCookies(['user']);

  if (fPData.success || fPData.error) {
    setTimeout(() => {
      setFPdata({ ...fPData, success: false, error: false });
    }, 2000);
  }

  // if (data.loading) {
  //   return (
  //     <div className="w-full md:w-9/12 flex items-center justify-center ">
  //       <svg
  //         className="w-12 h-12 animate-spin text-gray-600"
  //         fill="none"
  //         stroke="currentColor"
  //         viewBox="0 0 24 24"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           strokeWidth="2"
  //           d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  //         ></path>
  //       </svg>
  //     </div>
  //   );
  // }

  // const handleChangePassword = () => {
  //   // console.log(fPData);
  //   handleChangePassword(fPData, setFPdata, cookies.phone)
  // }

  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="shadow-lg border">
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
            Change Password
          </div>
          {
            fPData.error ?
            console.log(fPData.error) : ""
          }
          <hr />
          <div className="py-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
            {fPData.success ? (
              <div className="bg-green-200 px-4 py-2 rounded">
                {fPData.success}
              </div>
            ) : (
              ""
            )}
            {fPData.error ? (
              <div className="bg-red-200 px-4 py-2 rounded">{fPData.error}</div>
            ) : (
              ""
            )}
            <div className="flex flex-col space-y-2">
              <label htmlFor="oldPassword">Old Password</label>
              <div className="relative">
                <input
                  onChange={(e) =>
                    setFPdata({ ...fPData, oldPassword: e.target.value })
                  }
                  value={fPData.oldPassword}
                  type={fPData.type}
                  id="oldPassword"
                  className="z-10 border px-4 py-2 w-full focus:outline-none"
                />
                <span
                  onClick={(e) =>
                    setFPdata({
                      ...fPData,
                      passwordView: false,
                      type: "password",
                    })
                  }
                  className={`${
                    fPData.passwordView ? "" : "hidden"
                  } absolute right-0 m-2 box-border cursor-pointer`}
                >
                  {/* <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg> */}
                </span>
                <span
                  onClick={(e) =>
                    setFPdata({ ...fPData, passwordView: true, type: "text" })
                  }
                  className={`${
                    !fPData.passwordView ? "" : "hidden"
                  } absolute right-0 m-2 box-border cursor-pointer`}
                >
                  {/* <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg> */}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="newPassword">New Password</label>
              <input
                onChange={(e) =>
                  setFPdata({ ...fPData, newPassword: e.target.value })
                }
                value={fPData.newPassword}
                type="password"
                id="newPassword"
                className="border px-4 py-2 w-full focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={(e) =>
                  setFPdata({ ...fPData, confirmPassword: e.target.value })
                }
                value={fPData.confirmPassword}
                type="password"
                id="confirmPassword"
                className="border px-4 py-2 w-full focus:outline-none"
              />
            </div>
            <div
              // onClick={(e) => handleChangePassword()}
              onClick={(e) => handleChangePassword(fPData, setFPdata, cookies.phoneNo)}
              style={{ background: "#303031" }}
              className="w-full text-center cursor-pointer px-4 py-2 text-gray-100"
            >
              Change password
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserProfile = (props) => {
  return (
    <Fragment>
      <ProfileComponent />
      <SettingComponent />
    </Fragment>
  );
};

export default UserProfile;

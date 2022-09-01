import React, {useState, useEffect , useRef} from 'react'
import './adminLogin.css'

import {Link} from 'react-router-dom';
// import {Button} from '@material-ui/core';

import { Form, Input,message,Button } from 'antd';
import axios from 'axios';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MailIcon from '@material-ui/icons/Mail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import { useNavigate, useLocation } from 'react-router-dom';
// import AuthContext from "../../../context/AuthProvider";
// import useAuth from '../../../hooks/useAuth';

import { useDispatch } from 'react-redux';

// import { adminSignUp } from '../../../redux/actions/loginAction';

import { CircularProgress} from '@mui/material';

import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";
import { useCookies } from 'react-cookie'; 

export default function AdminLogin() {

		const dispatch = useDispatch()
		// const { setAuth } = useContext(AuthContext);
		const navigate = useNavigate();
		const [loader, setLoader] = useState(false);
		const [cookie, setCookie] = useCookies(['user']);

		// for error mesaage
    const [errMsg, setErrMsg] = useState('');
		const [warnInfo , setWarnInfo] = useState('')
		const [successMsg , setSuccessMsg] = useState('');
    const userRef = useRef();
    const errRef = useRef();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [user , setUser] = useState('');
    const [pwd, setPwd] = useState('');
    // const [errMsg , setErrMsg] = useState({
        // user_name:''
    // });
    const [success , setSuccess] = useState(false);
    const [signupOrLogin , setSignupOrLogin] = useState(false);

    const [regVal , setRegVal] = useState({
        fname: '',
        lname: '',
        userName: '',
        phone: '',
        password: '',
        confirm_password: ''
    })

    useEffect(()=>{
        // userRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('')
    } , [user, pwd])  

    const onFinish = async (values) =>{
        //  console.log('Success:', values);
			setLoader(true);   
			const username = values.email_log;
			const password = values.password_log;    
			console.log(username+ password + "from admin login")     
    	try {
				const response = await axios.post('http://localhost:5000/api/getAdmin	', 
					{
						username: username,
						password: password
					}
				)
				// console.log("this is just the respnse" + response)
				// console.log(response.data.status === 'success');

				console.log(response.data[0]);
				if(response?.error){
					setLoader(false);
					setErrMsg(response.data.message)
					console.log("im getting the error messgae  "+ errMsg)
				}else if(false){
					setLoader(false);
					setErrMsg(response.data.message)
				}else if(response.data[0]._id){
					setLoader(false);
					setErrMsg('')
					// console.log(response);
					console.log('admin');
					// const accessToken = 'response.data.accessToken';
					const role = response.data[0].role;
					const id = response.data[0]._id;
					const status = response.data[0].status;
					const user = response.data[0].username;
					console.log(role);

					let expires = new Date();
          expires.setTime(expires.getTime() + (2 * 60 * 60 * 1000));
          
          setCookie('ADusername', user, {path: '/', expires});
          setCookie('ADrole', role, {path: '/', expires});
          setCookie('ADid', id, {path: '/', expires});
          // setCookie('ADaccess_token', accessToken, { path: '/',  expires});

					// setAuth({email, password, accessToken});
					if(role === 'admin'){
						setLoader(false);
						console.log('admin');
						navigate('/dashboard')
					}else if(role === 'manager'){
						setLoader(false);
						console.log('manager');
						// if(status === 'pending'){
						// 	setWarnInfo("Account Has not been Activated, Please wait For Response")
						// }else if(status === 'Diactive'){
						// 	setErrMsg("Account Has been Diactivated")
						// }else if(status === 'Active'){
						// 	navigate('/productManagerDashboard')
						// 	message.success("login Successful")
						// }
					}else if(role === 'delivery'){
						setLoader(false);
						console.log('delivery');
						// if(status === 'pending'){
						// 	setWarnInfo("Account Has not been Activated, Please wait For Response")
						// }else if(status === 'Diactive'){
						// 	setErrMsg("Account Has been Diactivated")
						// }else if(status === 'Active'){
						// 	navigate('/deliveryDashboard')
						// 	message.success("login Successful")
						// }
					}
					// navigate(from, { replace: true })
				}else{
					setLoader(false);
					// console.log('product');
					// navigate('/productManagerDashboard')
					setErrMsg('Login Failed');
				}
    	}catch (err) {
				setLoader(false);
    	  console.log(err.response); 	 
          if (!err?.response) {
            setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
            setErrMsg('Missing Username');
          } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
          } else {
            setErrMsg('Login Failed');
          } 
				console.log(errMsg);
    	}
    };

		const onSignUpFinish = async (value) => {

			console.log('sign up' + value);			
			console.log(value);			
			
			try {
				
				if(regVal.userName.length < 3){
					setErrMsg('UserName must be more than 3 characters')
				}else if(regVal.password !== regVal.confirm_password){
					setErrMsg("Passwords dont match")
				}else if (regVal.password.length < 6){
					setErrMsg("Password must be more than 6 characters")
				}else{
					const response = await axios.post('http://localhost:5000/api/addAdminAccount',{
						userName: regVal.userName,
						fname: regVal.fname,
						lname: regVal.lname,
						phone: regVal.phone,
						password: regVal.password
					})
	
					console.log("this is the admin signup finishing");
					console.log(response.status);
					if(response.status === 200){
						console.log(response.data);
						setSuccessMsg("SignUp Successful");
						setRegVal({...regVal , userName:'' , email:'',confirm_email:'', access_key:'', password:'', confirm_password:''});
						setSignupOrLogin(false);
						setErrMsg("");
						message.success("SignUp Successful");
					}
				}
			} catch (err) {
				console.log(err.response.status); 
				if (!err?.response) {
				  setErrMsg('No Server Response');
				} else if (err.response?.status === 400) {
				  setErrMsg('Invalid Input Provided');
				} else if (err.response?.status === 404) {
				  setErrMsg('Account Not Found');
				} else if (err.response?.status === 401){
				  setErrMsg('Unauthorized');
				}else {
				  setErrMsg('SignUp Failed');
				} 
					  console.log(errMsg);
			}

		}
  

  return (
    <div className='adminLogin'>
			<div className="adminLoginWrapper">
				<div className="al_container">
					<div className="al_container_wrapper">
						<p ref={errRef} 
						className={errMsg ? "errmsg" : "offscreen"} 
						aria-live="assertive">
							{errMsg}
						</p>
						<p ref={errRef} 
						className={successMsg ? "successFul" : "offscreen"} 
						aria-live="assertive">
							{successMsg}
						</p>
						<p ref={errRef}
							className={warnInfo? "warnInfo" : "offscreen"}
							arial-live='assertive'>
								{warnInfo}
						</p>

						{
							signupOrLogin? (
							<>
								<div className="al_header">
									<h4>Administration SignUp</h4>                                    
								</div>
								<div className="al_body">
									<Form 
										name="normal_signup"
										className="admin_register_form"      onFinish={onSignUpFinish}>
										<Form.Item
											name="userName"
											rules={[{required: true
											, message: "UserName is required" 
										}]}>
											<Input type="text" 
												value={regVal.userName}
												prefix={<PermIdentityIcon/>} 
												placeholder="UserName"
												onChange={(e)=> setRegVal({...regVal, userName: e.target.value})}
												/>
										</Form.Item>

										<Form.Item
											name="fname"
											rules={[{required: true
											, message: "First name is required" 
										}]}>
											<Input type="text" 
												value={regVal.fname}
												prefix={<PermIdentityIcon/>} 
												placeholder="First name"
												onChange={(e)=> setRegVal({...regVal, fname: e.target.value})}
												/>
										</Form.Item>

										<Form.Item
											name="lname"
											rules={[{required: true
											, message: "Last name is required" 
										}]}>
											<Input type="text" 
												value={regVal.lname}
												prefix={<PermIdentityIcon/>} 
												placeholder="Last name"
												onChange={(e)=> setRegVal({...regVal, lname: e.target.value})}
												/>
										</Form.Item>

										<Form.Item
											name="phone"
											rules={[{required: true
											, message: "phone is required",
											pattern: /(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/
										}]}>
											<Input type="text" 
												value={regVal.phone}
												prefix={<PermIdentityIcon/>} 
												placeholder="Phona number"
												onChange={(e)=> setRegVal({...regVal, phone: e.target.value})}
												/>
										</Form.Item>

										{/* <Form.Item
												name="email"
												rules={[{required: true
												, message: "Email is not Valid",
												pattern: /(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/
											}]}
										>
												<Input type="text" 
														value={regVal.phone}
														prefix={<MailOutlineIcon/>} 
														placeholder="Phone number"
														onChange={(e)=> setRegVal({...regVal, phone: e.target.value})}
												/>
										</Form.Item> */}


										<Form.Item
												name="password_reg"
												rules={[{required: true
														, message: "Password is required",                                                
														}]}
										>
												<Input type="password" 
														value={regVal.password}
																prefix={<LockOpenIcon />} placeholder="Password" 
																onChange={(e)=> setRegVal({...regVal, password: e.target.value})}
												/>
										</Form.Item>

										<Form.Item
												name="confirm_password_reg"
												rules={[{required: true
														, message: "conifrm your password"
														}]}
										>
												<Input type="password" 
														value={regVal.confirm_password}
																prefix={<LockIcon/>} placeholder="Confirm Password" 
																onChange={(e)=> setRegVal({...regVal, confirm_password: e.target.value})}
												/>
										</Form.Item>

										<Form.Item
											name="signUp">
													<Button 
														className="al_login_btn"
														htmlType="submit">
															SignUp
												</Button>
										</Form.Item>
									</Form>
								</div>

									<p onClick={()=> {setSignupOrLogin(false) 
										setErrMsg('')}}>
										Login
									</p>
							</>
							):
							(
								<>
									<div className="al_header">
										<h4>Administration Login</h4>  
									</div>

									<div className="al_body">
										<Form
										name="normal_login"
										className="login_form"
										onFinish={onFinish}>
											<Form.Item
												name="email_log"
												rules={[{required: true, message: "Username is required"}]}>
												<Input type="text" 
														prefix={<MailOutlineIcon/>} 
														placeholder="User name"/>
											</Form.Item>

											<Form.Item
												name="password_log"
												rules={[{required: true, message: "Password is required"}]}>
												<Input type="password" 
														prefix={<LockOpenIcon />} 
														placeholder="Password"/>
											</Form.Item>

											<Form.Item name="login">
												<Button 
													className="al_login_btn"
													htmlType="submit">
														Login
												</Button>
											</Form.Item>
										</Form>   
									</div>   
									<div>
										{ loader ?
											<CircularProgress style={{color: "white"}} />
											:""
										}
									</div>                        
										
									<p onClick={()=> {setSignupOrLogin(true)
														 setErrMsg('');
														}}>SignUp</p>
										
								</>
							)
						}
					</div>
				</div>
			</div>
    </div>
  )
}

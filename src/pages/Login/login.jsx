import React, {useState, useEffect , useRef} from 'react'
import './login.scss'

import imgage from './search.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useCookies } from 'react-cookie';
import { Route, Navigate } from 'react-router-dom';

//for signup

import { CircularProgress} from '@material-ui/core';

import { useParams } from 'react-router-dom';
import { Switch } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined,PhoneOutlined ,MailOutlined ,GooglePlusOutlined  } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useLocation } from "react-router-dom";

//for signup

import { message } from 'antd';

// import { createUserByPhone, createUserByEmail, getAllUser } from '../../../redux/actions/userActions';


export default function AdminLogin() {
	const history = useNavigate();
	// const heroku = 'https://jimma-e-comm.herokuapp.com/';
	const heroku = 'http://localhost:5000/';
	// const localhost = 'http://localhost:5000/';
	 const localhost = 'https://jimma-e-comm.herokuapp.com/';
	const [cookies, setCookie] = useCookies(['user']);
	
	// const dispatch = useDispatch();
	const [inputRule, setInputRule] = useState({
		required:true,
		Emessage:"Email is required",
		Pmessage:"Phone Number is Invalid",
		passMessage:"Password is required",
		CPmessage:"Confirm Password is required"
	})
	
	const [isLogin ,setIsLogin] = useState(true);

	// for error mesaage
	const [errMsg, setErrMsg] = useState('');
	const [signUpErr , setSignUpErr] = useState('');
	const userRef = useRef();
	const errRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();

	// const user = useSelector((state) => state.getUser.user);

	const from = location.state?.from?.pathname || "/";

	const [loader, setLoader] = useState(false);

	const checkuser = async(phone) => {
        // const res = await axios.post('http://localhost:5000/api/checkUserPhone', {
        //         phone: phone
        // });
        // console.log(res.data);
        // return res.data;
	}

	const checkemail = async(email) => {
        // const res = await axios.post('http://localhost:5000/api/checkEmail', {
        //         email: email
        // });
        // console.log(res.data);
        // return res.data;
	}

	const [registerInfo , setregisterInfo] = useState({            
		fname: '',
		lname: '',
		username: '',
		email: '',
		phoneNo: '',
		password: '',
		conformPassword: ''
	})

	// finishing up registeration
	const onFinish = async () => {
		// const existNumber = await checkuser(values.phone_number);
		console.log(registerInfo);
		setLoader(true);
		try{
			if((registerInfo.fname === '') || (registerInfo.lname === '')  || (registerInfo.phoneNo === '') || (registerInfo.email === '') || (registerInfo.password === '') || (registerInfo.conformPassword === '')){
				setSignUpErr("Fill out all the form")
				setLoader(false)
			}
			else if(registerInfo.phoneNo === ''  || !/(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/.test(registerInfo.phoneNo) || registerInfo.phoneNo.length !== 10 ){
				setSignUpErr("Phone Number Is Invalid");
				setLoader(false);
			}
			else if(registerInfo.password !== registerInfo.conformPassword){
				setSignUpErr("Passwords Dont Match")
				setLoader(false)
			}
			else if(registerInfo.password.length < 6){
				setSignUpErr("Password must be more than 6 characters")
				setLoader(false);
			}
			// else if(existNumber){
			// 	message.error("Phone number already in use")
			// }
			else{
				const res = await axios.post((heroku +'/api/addUser'), {
						f_name: registerInfo.fname, 
						l_name: registerInfo.lname, 
						username: registerInfo.username,
						email: registerInfo.email, 	
						phone_number: registerInfo.phoneNo, 
						school_id: 'Indivisula',
						password: registerInfo.password
				});
				console.log(res.data.status);
				console.log(res.data);
				console.log(res);
				if(res.status === 200){
					setLoader(false);
					setSignUpErr("SignUp successfull");
					signUpButtons();
					// navigate('/login'); 
					setregisterInfo(() => {registerInfo.fname='',registerInfo.lname='',registerInfo.email='', registerInfo.phoneNo='', registerInfo.password='',registerInfo.conformPassword=''});
				}else{
					setLoader(false);
					setSignUpErr('Network error')
				}
			}
		} catch (err){
			setLoader(false);
			console.log(err);
			console.log(err?.response.status);
			if (!err?.response) {
				setSignUpErr('No Server Response');
				console.log('response error');
			} else if (err.response?.status === 400) {
				console.log('try again error');
				setSignUpErr('Try again');
			} else if (err.response?.status === 401) {
				console.log('in user name error');
				setSignUpErr('User name is taken');
			} else {
				console.log('login error');
				setSignUpErr('Login Failed');
			}
		}
	};

	const [loginInfo, setLoginInfo] = useState({
		phone_number: '',
		password: ''
	})

	const loginHandler = async () => {
			// console.log('Success:', values);
			// console.log(loginInfo)
		setLoader(true)

		try{
			let response;
			response = await axios.post((localhost + 'api/getUser'), {
				phone: loginInfo.phone_number,
				password: loginInfo.password
			})

			console.log(response.data[0]);
			console.log(response.data);
			
			if(response.data[0].phone){
				console.log('sucess');

				let expires = new Date();
				expires.setTime(expires.getTime() + (2 * 60 * 60 * 1000))

				setCookie('uid', response.data[0]._id, {path: '/', expires})
				setCookie('fname', response.data[0].fname, {path: '/', expires})
				setCookie('lname', response.data[0].lname, {path: '/', expires})
				setCookie('phoneNo', response.data[0].phone, {path: '/', expires})

				// console.log(cookies.uid);
				// return ( <Navigate to='/' /> )
				// console.log(from);
				navigate('/');
			}else{
				setLoader(false);
				console.log('login failed');
				console.log(cookies.uid);
			}
		}catch (err) {
			setLoader(false);
			console.log(err);
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Username not found');
			} else if (err.response?.status === 401) {
				setErrMsg('Incorrect password');
			} else {
				setErrMsg('Login Failed');
			}
		}
	};
	
	const onFinishFailed = (errorInfo) => {
			console.log('Failed:', errorInfo);
	};

	const container = document.getElementById('container');

	const signUpButtons = () => {
		console.log(isLogin);
		setErrMsg('');
		setSignUpErr('');
		setLoader(false);
		
		setregisterInfo({...registerInfo, fname:'',lname:'',email:'', phoneNo:'', password:'', conformPassword:''});
		navigate('/login');
	};
	
	const signInButton = () => {
		console.log(isLogin);
		setSignUpErr('');
		setErrMsg('');
		setLoader(false);
		// container.classList.remove("right-panel-active");
		setregisterInfo({...registerInfo, fname:'',lname:'',email:'', phoneNo:'', password:'', conformPassword:''});
		navigate('/register');
	};

	return(
    <>       
			<div className="login">
				<div className="main">
					{/* <h2> */}
						{/* Weekly Coding Challenge #1: Sign in/up Form */}
					{/* </h2> */}
					{isLogin ?(
						<div className="container" id="container ">
						
							<div className="form-container sign-up-container">
								<form action="#">
									<h1>Create Account</h1>
									<div className="social-container">
										<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
										<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
										<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
									</div>

									<span>or use your email for registration</span>
									<input type="text" placeholder="Name" />
									<input type="email" placeholder="Email" />
									<input type="password" placeholder="Password" />
									<button>Sign Up</button>
								</form>
							</div>

							<div className="form-container sign-in-container">
								<Form onFinish={loginHandler}>
									<h1 className='signinTitle'>Sign In</h1>
									<p ref={errRef} className={errMsg ? "loginErrMsg" : "login_offscreen"} aria-live="assertive">
                        {errMsg}</p>
									<Input 
									type="text" 
									value={loginInfo.phone_number}
									onChange={(e) => {
										setLoginInfo({...loginInfo, phone_number: e.target.value})
									}}
									placeholder="Phone Number" />

									<Input 
									type="password"
									onChange={(e) => 
										setLoginInfo({...loginInfo, password: e.target.value})
									}
									value={loginInfo.password} 
									placeholder="Password" />

									{ 
										loader ?
										<CircularProgress style={{color: "black"}} /> : ""
									}

									<a href="#">Forgot your password?</a>
									<button>Sign In</button>
									<p>If u dont have an account? <span onClick={signInButton} className='btnLink'>sign up</span> </p>
								</Form>
							</div>

						<div className="overlay-container">
							<div className="overlay">
								<div className="overlay-panel overlay-left">
									<h1>Jimma</h1>
									<p>If u don't have an account
										<span onClick={signInButton} className='btnLink'>sign up</span>
									</p>
									{/* <button class="ghost" id="signIn" onClick={signInButton}>Sign Up</button> */}
								</div>
							</div>
						</div>
					</div>
					) : (
					<div className="container right-panel-active" id="container ">
						<div className="form-container sign-up-container">
							<Form autoComplete='off'>
								<div className='title'>
									<h1>Create Account</h1>
									{/* <p>Enter your personal details and start journey with us</p> */}
								</div>
								<p ref={errRef} 
								className={signUpErr ? "signUpErrMsg erroMessage" : "signUpoffscreen erroMessage"} aria-live="assertive">
									{signUpErr}
								</p>
								<input 
								type="text" 
								placeholder="First Name" 
								value={registerInfo.fname}
								onChange={(e) => {
									setregisterInfo({...registerInfo, fname: e.target.value})
								}}
								autoComplete="off"
								/>
								<input 
								type="text" 
								placeholder="Last Name" 
								value={registerInfo.lname}
								onChange={(e) => {
									setregisterInfo({...registerInfo, lname: e.target.value})
								}}
								autoComplete="off"
								/>
								<input 
								type="text" 
								placeholder="User name" 
								value={registerInfo.username}
								onChange={(e) => {
									setregisterInfo({...registerInfo, username: e.target.value})
								}}
								autoComplete="off"
								/>
								<input 
								type="email" 
								placeholder="Email"
								value={registerInfo.email}
								onChange={(e) => {
									setregisterInfo({...registerInfo, email: e.target.value})
								}}
								autoComplete="off"
									/>
								<input 
								type="text" 
								placeholder="Phone number"
								value={registerInfo.phoneNo}
								onChange={(e) => {
									setregisterInfo({...registerInfo, phoneNo: e.target.value})
								}}
								autoComplete="off"
								/>
								<input type="password" placeholder="Password" 
								value={registerInfo.password}
								onChange={(e) => {
									setregisterInfo({...registerInfo, password: e.target.value})
								}}
								autoComplete="off"
								/>
								<input 
								type="password" 
								placeholder="Conform password"
								value={registerInfo.conformPassword}
								onChange={(e) => {
									setregisterInfo({...registerInfo, conformPassword: e.target.value})
								}}
								autoComplete="off"
								/>
								{ 
									loader ?
									<CircularProgress style={{color: "black"}} /> : ""
								}
								<button onClick={onFinish}>Sign Up</button>
								<p>If you already have an account,
									<span onClick={signUpButtons} className='btnLink'>sign in</span>
								</p>
							</Form>
						</div>

						<div className="form-container sign-in-container">
							{/* <form action="#">
								<h1>Sign in</h1>
								<div className="social-container">
									<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
									<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
									<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
								</div>
								<span>or use your account</span>
								<input type="email" placeholder="Email" />
								<input type="password" placeholder="Password" />
								<a href="#">Forgot your password?</a>
								<button>Sign In</button>
							</form> */}
						</div>

						<div className="overlay-container">
							<div className="overlay">
								<div className="overlay-panel overlay-right">
									<h1>Pazion</h1>
									<p>Enter your personal details and start journey with us</p>
									{/* <button class="ghost" id="signUp" onClick={signUpButtons}>Sign In</button> */}
									{/* <p>If u already have an account 
										<span onClick={signUpButtons} className='btnLink'>sign in</span>
									</p> */}
								</div>
							</div>
						</div>
					</div>
					)}
			  </div>
			</div>
	  </>
	)
}

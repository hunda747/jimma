import React, {useState} from 'react';
import logo from '../../assets/photo/tolo.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link, Navigate} from 'react-router-dom';
import {useSelector } from 'react-redux';
import {ShoppingCart} from '@material-ui/icons';
import { useCookies } from 'react-cookie';
import classes from './navbar.module.scss'
import {BiMenuAltRight} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';



export default function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [menuOpen , setMenuOpen] = useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('fname', { path: '/' });
    removeCookie('lname', { path: '/' });
    removeCookie('phoneNo', { path: '/' });
    removeCookie('uid', { path: '/' });
    navigate('/');
    window.location.reload(false);
  }

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  
  const getCartCount = ()=>{
    return cartItems.reduce((qtyCounter, item) => Number(item.qtyCounter) + qtyCounter , 0);
  }

  const menuToggleHandler = ()=>{
    setMenuOpen((e)=> !e) // set opposite to what is given
  }


  return(
    <>
      <header className={classes.header}>
          <div className={classes.header__content}>
              <div onClick={() => {navigate('/')}} className={classes.header__content__logo}>
                  <img src={logo} alt="Logo" width='100px' height='100px'/>
              </div>

              <nav className={`${classes.header__content__nav} ${menuOpen ? classes.isMenu : ''}`}
                 style={menuOpen? {boxShadow: '1px 12px 19px 0px rgba(0,0,0,0.75)',
                 webkitBoxShadow: '1px 12px 19px 0px rgba(0,0,0,0.75)',
                 mozBoxShadow: '1px 12px 19px 0px rgba(0,0,0,0.75)'}:{}}
              >
                  {/* <div className={classes.header__content__nav__logo}  style={menuOpen? {marginTop: '1rem'}:{}}>
                      <img src={logo} alt="Logo"  style={{width:'60px', height: '60px', marginBottom: '5rem'}} />
                  </div> */}
                  <ul>
                    <li>
                      <Link  to='/'  onClick={()=> setMenuOpen(false)}> Home</Link>
                    </li>
                    <li>
                      <Link to='/' onClick={()=> setMenuOpen(false)}> Shop</Link>
                    </li>
                    <li>
                      <Link to='/about' onClick={()=> setMenuOpen(false)}> About</Link>
                    </li>
                    <li>
                      <Link to='/contact'  onClick={()=> setMenuOpen(false)}> Contact</Link>
                    </li>

                    <li> 
                      
                      {
                        cookies?.uid ? 
                          <div className={classes.header__content__nav__controllers} 
                            style={menuOpen? {width:'100%'}:{}}
                              
                          > 
                            <>
                              <Link style={menuOpen? {cursor:'pointer', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}:{width:'fit-content'}}  to='/checkout'  onClick={()=> setMenuOpen(false)}> <ShoppingCart/> <span>{getCartCount()}</span></Link>
                              </>
                              

                              <div className={classes.header__content__nav__controllers__logoutHolder} 
                            style={menuOpen? {marginTop: '1rem', display:'flex', width: '100%' , justifyContent: 'center', alignItems:'center',}:{}}
                            > 

                             <>
                             <AccountCircleIcon style={menuOpen? {cursor:'pointer', marginRight:'0.5rem'  ,fontSize: '40px' , color: '#6464d5'}:{}} onClick={() => {navigate('/account')}}/>
                             </>
                              <Button variant="contained" color="secondary" onClick={handleLogout}>
                                Logout
                              </Button>
                            </div>
                          </div>
                      :
                        <div className={classes.header__content__nav__controllers}>
                           
                               <>
                              <Link style={menuOpen? {cursor:'pointer', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}:{width:'fit-content'}}  to='/checkout'  onClick={()=> setMenuOpen(false)}> <ShoppingCart/> <span>{getCartCount()}</span></Link>
                              </>                              
                          <Link to='/login' style={!menuOpen? {width:'fit-content'}:{}} >                           
                            <Button variant="contained" color="secondary">
                               Login
                            </Button>
                          </Link>
                        </div>
                      }
                   
                    </li>                  
                  </ul>

              </nav>            

              <div className={classes.header__content__toggle}>
                {
                  !menuOpen ?  <BiMenuAltRight onClick={menuToggleHandler} /> : <AiOutlineClose onClick={menuToggleHandler} />
                }
             </div>  

          </div>
      </header>

{/* 
      <div className="navbar_main">
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <Link to={"/"}>
                <img src={logo} alt="logo" height={'50px'}/>
               
              </Link>
            </div>

            <div className="menus">
              <ul>
                <li className='menu current'>Home</li>
                <li className='menu'>Menu</li>
                <li className='menu'>Services</li>
                <li className='menu'>Shop</li>
              </ul>
            </div>

            <div className="icons">
              <div className="icon">
                <div className="cartIconHolder smaller">
                  <Link to='/checkout'>  
                    <ShoppingCartSharp 
                    style={{color: 'black'}}
                    className='infosIcons' />   
                    <span>{getCartCount()}</span>
                  </Link>
                </div>
              </div>

              
              {cookies?.uid ? 
                <div className="icon">
                  <div className="accountIconHolder" onClick={handleLogout}>
             
                      <AccountCircle />
                      LOGOUT
                
                  </div>
                </div>
              :
                <div className="icon">
                  <Link to='/login'>
                    <div className="accountIconHolder">
                    
                      LOGIN
                    </div>
                  </Link>
                </div>
              }
            </div>

          </div>
        </div>
      </div> */}
      
    </>
  )
};


// {/* <div className="navbar_main">
//         <div className="container">
//           <div className="navbar">
//             <div className="logo">
//               <Link to={"/"}>
//                 {/* <img src={logo} alt="logo" height={'100px'}/> */}
//                 Jimma Delivery
//               </Link>
//             </div>
//             <div className="menu"> */}
              {/* <div className="btn">
                <Link to='/login'>
                  Login
                </Link>
              </div> */}
              {/* <div className="icons">
                <Link to='/checkout'>
                  <div className="cartIconHolder">
                    <Favorite />
                  </div>
                </Link>
              </div> */}
              {/* <div className="icons">
                <div className="cartIconHolder smaller">
                  <Link to='/checkout'>  
                    <ShoppingCartSharp 
                    
                    className='infosIcons' />   
                    <span>{getCartCount()}</span>
                  </Link>
                </div>
              </div> */}

              {/* <div className="btn">
                {cookies?.fname}

                <button  onClick={handleLogout}>
                  <ExitToApp />
                </button>
              </div> */}
              {/* {cookies?.uid ? 
                <div className="icons">
                  <div className="accountIconHolder" onClick={handleLogout}> */}
                    {/* <Link to='/login'> */}
                      {/* <AccountCircle />
                      LOGOUT */}
                    {/* </Link> */}
                  {/* </div>
                </div>
              :
                <div className="icons">
                  <Link to='/login'>
                    <div className="accountIconHolder">
                      <AccountCircle />
                      LOGIN
                    </div>
                  </Link>
                </div>
              } */}
                {/* <div className="btn">
                  <Link to='/register'>
                    Sign Up
                  </Link>
                </div> */}
{/*               
            </div>
          </div>
        </div>
      </div> */}



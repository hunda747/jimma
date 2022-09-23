import React, {useState, useEffect} from 'react';
import './navbar2.css'

import photo from '../../assets/photo/bj5.jpg';
import logo from '../../assets/photo/tolo.png';

import {Favorite, SearchIcon, ExitToApp, AccountCircle} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {Twitter, Instagram, Facebook, LinkedIn, LocationOn, List, ShoppingCart, ShoppingCartSharp} from '@material-ui/icons';

import { useCookies } from 'react-cookie';

import classes from './navbar.module.scss'

import {BiMenuAltRight} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import Button from '@material-ui/core/Button';

export default function navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [menuOpen , setMenuOpen] = useState(false)

  const handleLogout = () => {
    removeCookie('fname', { path: '/' });
    removeCookie('lname', { path: '/' });
    removeCookie('phoneNo', { path: '/' });
    removeCookie('uid', { path: '/' });
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
              <div className={classes.header__content__logo}>
                  <img src={logo} alt="Logo" />
              </div>

              <nav className={`${classes.header__content__nav} ${menuOpen ? classes.isMenu : ''}`}>
                  <ul>
                    <li>
                      <Link  style={menuOpen? {color:'white'}: {}} to='/' spy={true} smooth={true} offset={-100} duration={500} onClick={()=> setMenuOpen(false)}> Home</Link>
                    </li>
                    <li>
                      <Link  style={menuOpen? {color:'white'}: {}} to='/' spy={true} smooth={true} offset={-100} duration={500} onClick={()=> setMenuOpen(false)}> Menu</Link>
                    </li>
                    <li>
                      <Link  style={menuOpen? {color:'white'}: {}} to='/' spy={true} smooth={true} offset={-100} duration={500} onClick={()=> setMenuOpen(false)}> Services</Link>
                    </li>
                    <li>
                      <Link  style={menuOpen? {color:'white'}: {}} to='/' spy={true} smooth={true} offset={-100} duration={500} onClick={()=> setMenuOpen(false)}> Shop</Link>
                    </li>

                      <li>
                        <Link  style={menuOpen? {color:'white' , marginTop: '10rem'}: {}} to='/checkout' spy={true} smooth={true} offset={-100} duration={500} onClick={()=> setMenuOpen(false)}> <ShoppingCart/> <span>{getCartCount()}</span></Link>
                    </li>
                    <li> 
                    <Button variant="outlined" color="secondary">
                          Logout
                    </Button>
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
import React from 'react';
import  classes from './footer.module.scss';
import { Link } from 'react-router-dom';
import {Twitter, Instagram, Facebook, LinkedIn} from '@material-ui/icons';

export default function Footer() {
  return (
    <>
      <footer className={classes.footer}>
        <div className={classes.footer__container}>
               <div className={classes.footer__container__logoHolder}>
                    <img src="https://i.im.ge/2022/09/27/1NHrd1.tolo.jpg" alt="Logo" />
                     <h2>TOLO DELIVERY</h2>
                
                </div>
              <div className={classes.footer__container__needHelp}>
                    <h1>Need Help</h1>
                    <p>Call us +251921321231</p>

                    <p>Email: tolo@jimaDelivery.com</p>
                    <p><Twitter/> : @toloDelivery</p>
                    <p><Instagram />: @toloJima_delivery</p>

              </div>
              <div className={classes.footer__container__knowUs}>
                  <h1>Get to know us</h1>

                  <Link to={'/about'} >
                  <p>About Us</p>
                  </Link>
                  <Link to={'/contact'}>
                  <p>Contact Us</p>
                  </Link>
                  <Link to={'#'}>
                  <p>Tolo Delivery</p>
                  </Link>              
                  
                  
                  <p>Location</p>
              </div>
              <div className={classes.footer__container__letsHelp}>
                    <h1>Lets Help You</h1>

                    <Link to={'/login'}>
                      <p>Login</p>
                    </Link>
                    <Link to={'/register'}>
                      <p>SignUp</p>
                    </Link>
                    <Link to={'/account'}>
                      <p>Account Details</p>
                    </Link>
                    
                   
                    <p>Jima</p>
              </div>
        </div>
        <div className={classes.footer__copyRight}>
            <p>Powerd by : DH software solutions</p>
        </div>  
      </footer>
    </>
  )
}
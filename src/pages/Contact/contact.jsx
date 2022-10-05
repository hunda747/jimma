import React from 'react'
import {Link} from 'react-router-dom'


import classes from './contact.module.scss'
import Navbar from '../../component/Navbar/navbar'
import Footer from '../../component/Footer/footer'


import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function Contact() {
  return (
        <>
            <Navbar/>

            <div className={classes.contact}>
                <h1>Contact Us</h1>
                    <div className={classes.contact__info}>
                            <div className={classes.contact__info__phone}>
                                    <h1>Feel Free To Call</h1>
                                    <span><PhoneAndroidIcon/></span>
                                    <h2>+251921231231</h2>
                            </div>
                            <div className={classes.contact__info__email}>
                                 <h1>Send Us Email</h1>
                                 <span><MailOutlineIcon/></span>
                                 <h2>tolo@jimaDelivery.com</h2>
                            </div>

                    </div>
                    <div className={classes.contact__social}>
                        <h1>Follow Us on Our Social Media</h1>
                         <div className={classes.contact__social__media}>
                                
                                <div className={classes.contact__social__media__insta}>
                                    <Link to='/'>
                                        <InstagramIcon/>
                                        <p>Instagram</p>
                                    </Link>
                                     
                                </div>
                                <div className={classes.contact__social__media__telegram}>
                                    <Link to='/'>
                                        <TelegramIcon/>
                                        <p>Telegram</p>
                                    </Link>                                   
                                </div>
                                <div className={classes.contact__social__media__twitter}>
                                     <Link to='/'>
                                        <TwitterIcon/>
                                        <p>Twitter</p>
                                     </Link>
                                     
                                </div>
                                <div className={classes.contact__social__media__facebook}>
                                    <Link to='/'>
                                        <FacebookIcon />
                                        <p>Facebook</p>
                                    </Link>
                                    
                                </div>
                        
                         </div>
                    </div>
            </div>



            <Footer/>
        
        
        
        </>
  )
}

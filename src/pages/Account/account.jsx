import React, {useRef, useState, useEffect} from 'react'


import classes from './account.module.scss'


import Navbar from '../../component/Navbar/navbar'
import ProfileComponent from './UserProfile'
import SettingUser from './SettingUser'
import UserOrder from './userOrder'
import Footer from '../../component/Footer/footer'
import Sidebar from './Sidebar'

export default function Account() {
  const [counter, setCounter] = useState(0);

  const passedFunction = (id) => {
    setCounter(id);
  }

  return(
    <>
      <Navbar />
      <div className={classes.account}>
            <Sidebar  changeCounter={passedFunction} counter={counter}/>
            <div className={classes.account__optionDetails}>
                {
                counter === 0 ? 
                  <UserOrder />
                : counter === 1 ?
                  <ProfileComponent />  
                : ""
              }
            </div>
      </div>    
      <Footer/>
    </>
  )
};

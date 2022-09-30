import React, {useRef, useState, useEffect} from 'react'
import './account.css'

import SlideBar from './Sidebar'
import Navbar from '../../component/Navbar/navbar'
import UserProfile from './UserProfile'
import SettingUser from './SettingUser'
import UserOrder from './userOrder'

export default function Account() {
  const [counter, setCounter] = useState(0);

  const passedFunction = (id) => {
    setCounter(id);
  }

  return(
    <>
      <Navbar />
      <div className="bar">
        <div className="menus">
          <SlideBar changeCounter={passedFunction}/>  
        </div>
        <div className="view">
          {
            counter === 0 ? 
              <UserOrder />
            : counter === 1 ?
              <UserProfile />  
            : counter === 2 ? 
              "2"
            : counter === 3 ? 
              <SettingUser />
            : counter === 4 ? 
              "4" 
            : ""
          }
        </div>
      </div>
    </>
  )
};

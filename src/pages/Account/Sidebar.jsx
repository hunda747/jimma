import React, { Fragment, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


import classes from './account.module.scss'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
const Sidebar = ({changeCounter , counter}) => {
  // const { data } = useContext(DashboardUserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const history = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeCookie('fname', { path: '/' });
    removeCookie('lname', { path: '/' });
    removeCookie('phoneNo', { path: '/' });
    removeCookie('uid', { path: '/' });
    navigate('/');
    window.location.reload(false);
  }

  return (
    <>
      <div className={classes.sidebar}>
            <div className={classes.sidebar__acountInfo}>
                 <div className={classes.sidebar__acountInfo__avatar}>
                        <AccountCircleOutlinedIcon/>
                  </div>
                 <div className={classes.sidebar__acountInfo__nameAphone}>
                      <p>UserName: {cookies.fname} {cookies.lname}</p>
                      <p>PhoneNo:  {cookies.phoneNo}</p>
                 </div>
            </div>
            <div className={classes.sidebar__options}>
                <div 
                    className={classes.sidebar__optopns__orders} 
                    style={counter === 0? {background: 'orange', borderRadius: '0.5rem'} : {}}
                    onClick={(e) => changeCounter(0)}>Orders
                </div>
                <div 
                    className={classes.sidebar__options__accountDetail}
                    style={counter === 1? {background: 'orange', borderRadius: '0.5rem'} : {}}
                    onClick={(e) => changeCounter(1)}>Account Detail
                
                </div>
                <div className={classes.sidebar__options__logout} 
                      style={{borderRadius:'0.5rem' , background: 'linear-gradient(to top, rgb(255 0 42 / 61%), rgb(255 0 0))' , color:'white'}}
                     onClick={(e) => handleLogout()} >Logout</div>
              

            </div>
      </div>


     
    </>
  );
};

export default Sidebar;

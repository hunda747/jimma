import React, {useEffect} from "react";

import { useDispatch, useSelector } from 'react-redux';
import { getOrdersbyUser, getOrdersComplete } from '../../redux/actions/orderActions';
import { useCookies } from "react-cookie";
 
import classes from './account.module.scss'

import { Collapse } from 'antd';

import { CircularProgress } from "@mui/material";
const { Panel } = Collapse;
import Row from './orderDetail';





export default function UserOrder(params) {
  const dispatch = useDispatch();
  
	const [cookies, setCookie] = useCookies(['user']);

  useEffect(()=>{
    // fetchAllOrders();
    dispatch(getOrdersbyUser(cookies.uid));
  },[])
  
  const orders = useSelector((state) => state.order.orders);
  const orderLoad = useSelector((state) => state.order.loading);

  console.log('order info from user order file ')
  // orders.map((val, index)=> console.log(val))
  
  return (

    <>
      <div className={classes.userOrderHolder}>
        <Collapse accordion>
          {!orderLoad ? 
            <>
              {!orders?.length ? 
                <div>No Previous Orders</div> 
              : 
                (
                  orders?.map((val , index)=>{
                    return(
                      <>
                        <Panel header={`Order ID : ${val._id}`} key={index}>
                          <Row 
                            key = {val._id}   
                            id = {val._id}
                            fname = {val.fname}
                            lname = {val.lname}
                            contact = {val.contact} 
                            user = {val.userId}
                            total = {val.total}
                            date = {val.date}
                            status = {val.status}
                            address = {val.address}
                            orders = {val.orders}
                            longitude = {val.longitude}
                            latitude = {val.latitude}
                            admin = {true}
                            />
                        </Panel>
                      </>
                    )
                  })
                )
              }
            </>
          :
            <div className={classes.userOrderHolder__load}>
              <CircularProgress />
            </div>
          }
        </Collapse>
      </div>
    </>
  )
};

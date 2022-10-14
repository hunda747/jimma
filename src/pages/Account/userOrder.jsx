import React, {useEffect} from "react";


import { useDispatch, useSelector } from 'react-redux';
import { getOrdersbyUser, getOrdersComplete } from '../../redux/actions/orderActions';
 

import classes from './account.module.scss'
import { useCookies } from "react-cookie";


//antd icon import
import {ExclamationCircleOutlined } from '@ant-design/icons'
//antd collapse imports

import { Collapse } from 'antd';

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

  console.log('order info from user order file ')
  // orders.map((val, index)=> console.log(val))
  
  return (

    <>
      <div className={classes.userOrderHolder}>

          <Collapse accordion>
              {
                 !orders?.length ? <div>No Orders</div> : 
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
        
            </Collapse>
      </div>
      


      {/* <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead >
            <TableRow>
              <TableCell />
              
              <TableCell>Date</TableCell>
              <TableCell>Address</TableCell>
            
              <TableCell align="right">
                Sub-Total</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            !orders?.length ? <div>No Orders</div> : (
              orders.map((val, key) => {
                console.log(val);
                return (
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
                  )
              }
            ))
          }
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  )
};

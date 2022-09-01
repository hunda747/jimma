import React, {useEffect} from "react";
// import Chart from "react-apexcharts";
import './home.css'
// import OrderMap from "../OrderMap/orderMap";

// import Charts from '../../../component/Admin/charts';

// import {Table, TableBody, TableCell, TableContainer, TableRow, Paper} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../../redux/actions/restaurantAction';
// import {  } from '../../../redux/actions/';
// import { getOrderReports, getOrderTotal } from "../../../redux/actions/orderReportAction";
// import { getUserLogDetail } from "../../../redux/actions/userLogActions";
import { Button } from "@material-ui/core";

const data = [
  {
    name: 'Monday',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Tuesday',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Wendnday',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Thursday',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Friday',
    uv: 1890,
    pv: 4800,
  },
];

export default function Home({onMorePage}) {

  const dispatch = useDispatch();

 	useEffect(() => {
    dispatch(getAllRestaurants());
 	}, []);
   
  // const orderTotals = useSelector((state) => state.getOrderTotal.total);
  // const orderReports = useSelector((state) => state.getOrderReport.orderReports);
  // const userLog = useSelector((state) => state.userCount.userLog);

  const days = ['Fri','Sat','Sun','Mon','Tue','Wen','Thu',];

  // let totalUserNo = 0;
  // let totalOrderNo = 0;
  // let totalUserNoToday = 0;
  // let addCartCount = 0;
  // let reachedCheckout = 0;
  // let purchaseCount = 0;
  // let userByHour = [];
  // let deviceType = [];
  // let locations = [];
  // {
  //   userLog?.map((userlog) => {
  //     console.log(userlog.noOFTotalUser);
  //     //if(!userlog.noOFTotalUser === null){
  //       totalUserNo = userlog.noOFTotalUser;
  //       totalOrderNo = userlog.noOFTotalOrder;
      
  //     //if(!userlog.noOfTotalUserByDate === null){
  //       totalUserNoToday = userlog.noOfTotalUserByDate;
      
  //     addCartCount = (userlog.cartCount/totalUserNo*100).toFixed(2);
  //     reachedCheckout = (userlog.checkCount/totalUserNo*100).toFixed(2);
  //     purchaseCount = (totalOrderNo/totalUserNo*100).toFixed(2);
  //     userByHour = userlog.noOfTotalUserByDateHour;
  //     deviceType = userlog.deviceType;
  //     locations = userlog.location;
  //   })
  // }
  
  // console.log('user log');
  // console.log(deviceType);
  // // console.log(totalUserNoToday);
  // // console.log(Object.keys(userByHour));


  // let totalPrice = 0;
  // let orderNo = 0;
  // let average = 0;
  // let topProdByQun = [];
  // let topProdByPrice = [];
  // {
  //   orderTotals?.map((repo) => {
  //     if(repo.totalPrice){
  //       totalPrice = repo.totalPrice;
  //       console.log(repo.totalPrice);
  //     }else{
  //       console.log(repo.totalPrice);
  //     }
  //     if(repo.orders){
  //       orderNo = repo.orders;
  //     }
  //     if(repo.average){
  //       average = repo.average;
  //     }
  //     topProdByQun = repo.topProdByQun;
  //     topProdByPrice = repo.topProdByPrice;
  //   })
  // } 
  // // console.log(topProdByQun);
  
  // const prices = [];
  // const priceAverage = [];
  // const dates = [];
  // const orders = [];
  // {
  //   orderReports?.map((order) => {
  //     dates.push((order.date).slice(5));
  //     prices.push(order.total);
  //     orders.push(order.orders);
  //     priceAverage.push(order.average);
  //   })
  // }

  // console.log(orderReports);
  // console.log(prices);
  

  return (
    <>
      <div className="dashboardChartHolder">
        <div className="main"><h1>home</h1></div>
      </div>    
    </>
  )
}


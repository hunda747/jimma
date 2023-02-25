import React, { useEffect } from "react";
// import Chart from "react-apexcharts";
import "./home.css";
// import OrderMap from "../OrderMap/orderMap";

// import Charts from '../../../component/Admin/charts';

// import {Table, TableBody, TableCell, TableContainer, TableRow, Paper} from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../../redux/actions/restaurantAction";
// import {  } from '../../../redux/actions/';
// import { getOrderReports, getOrderTotal } from "../../../redux/actions/orderReportAction";
// import { getUserLogDetail } from "../../../redux/actions/userLogActions";
import { Button } from "@material-ui/core";
import { ArrowBack, ArrowUpward } from "@mui/icons-material";

export default function Home({ onMorePage }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wen", "Thu"];

  return (
    <>
      <div className="dashboardChartHolder">
        <div className="wraper">
          <div className="main">{/* <h3>home</h3> */}</div>

          <div className="count">
            <div className="countCard">
              <h3>PENDING</h3>
              <div className="number">
                <img src="" alt="" />
                <ArrowBack />
                <div>10</div>
              </div>
            </div>
            <div className="countCard">
              <h3>INPROGRESS</h3>
              <div className="number">
                <ArrowUpward />
                <div>5</div>
              </div>
            </div>
            <div className="countCard">
              <h3>COMPLETED </h3>
              <div className="number">
                <ArrowUpward />
                <img src="" alt="" />
                <div>20</div>
              </div>
            </div>
            <div className="countCard">
              <h3>CANCELED </h3>
              <div className="number">
                <ArrowUpward />
                <img src="" alt="" />
                <div>8</div>
              </div>
            </div>
          </div>

          <div className="count">
            <div className="something shadow">Orders</div>
            <div className="something shadow">Customer</div>
          </div>

          <div className="something shadow">Restaurants</div>
        </div>
      </div>
    </>
  );
}

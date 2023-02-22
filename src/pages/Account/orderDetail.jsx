import React, { useEffect, useState } from "react";
// import '../../component/Admin/orderRow/orderRow.css'
import classes from "./account.module.scss";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/actions/cartActions";
import {
  changeOrderStatus,
  getOrdersPending,
  getOrdersComplete,
} from "../../redux/actions/orderActions";
import { getOrderDetails } from "../../redux/actions/orderDetailAction";
// import { returnProduct } from '../../../redux/actions/productActions';

import ReactMapGL, { Marker } from "react-map-gl";

//new antd imports
const { Step } = Steps;
import { Steps } from "antd";
import { Button } from "antd";
import { Collapse } from "antd";
const { Panel } = Collapse;

export default function OrderDetail(props) {
  const steps = [
    "Processing",
    "Shipped",
    props?.status === "cancel" ? "Canceled" : "Delivered",
  ];
  // const orders = useSelector((state) => state.orderDetail.orderDetail);

  const [viewPort, setViewPort] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
    zoom: 14,
    width: "100vw",
    height: "100vh",
  });

  const [marker, setMarker] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
  });
  // const { row } = props;
  const [open, setOpen] = React.useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(!open);
    // const id = props.Order_id;
  };

  useEffect(() => {
    console.log(props.id);
    // dispatch(getOrderDetails(props.id));
  }, []);

  const handleCancelOrder = () => {
    console.log(props.id);
    dispatch(changeOrderStatus(props.id, "cancel"));
    dispatch(getOrdersPending());
    //window.location.reload(true);
  };


  //orders items list
  // orders?.map((val) => console.log(val._id.food_name));
  return (
    <>
      <div className={classes.orderDetailHolder}>
        <div className={classes.orderDetailHolder__detailAndMap}>
          <div className={classes.orderDetailHolder__detailAndMap__detail}>
            <h4>Details</h4>
            <p>Order ID: {props.id} </p>
            <p>Order Date: {props.date.substr(0, 10)} </p>
            {/* <p>Orderd By:  {props.fname} {props.lname}</p> */}
            <p>Order Status: {props.status} </p>
          </div>
          <div className={classes.orderDetailHolder__detailAndMap__map}>
            <ReactMapGL
              {...viewPort}
              mapboxAccessToken="pk.eyJ1IjoiZGFuaGdiIiwiYSI6ImNsMXVnNDIxbzAwMmYzcXBiMXB0ZWVjcWMifQ.nC63RhWneFhiZ4k4XJim9A"
              onMove={(viewPort) => {
                setViewPort(viewPort);
              }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              <Marker
                style={props.status === "cancel" ? { color: "red" } : {}}
                latitude={marker.latitude}
                longitude={marker.longitude}
              />
            </ReactMapGL>
          </div>
        </div>
        <div className={classes.orderDetailHolder__progressView}>
          <Steps
            current={1}
            status={
              props.status === "cancel"
                ? "error"
                : props.status === "pending"
                ? "process"
                : props.status === "complete"
                ? "finish"
                : ""
            }
          >
            <Step title="Ordered" description="Successfull Ordered Product" />
            <Step
              title={
                props.status === "cancel"
                  ? "Canceled"
                  : props.status === "pending"
                  ? "Waiting"
                  : "Shipped"
              }
              description={
                props.status === "cancel"
                  ? "Order has been Canceled"
                  : props.status === "pending"
                  ? "Waiting for Confirmation"
                  : "Product in route to you"
              }
            />
            <Step title="Delivered" description="You have recieved Order" />
          </Steps>

          <Button
            onClick={handleCancelOrder}
            style={{ marginTop: "1rem", width: "fit-content" }}
            danger
            disabled={
              props.status !== "inProgress" && props.status !== "cancel"
                ? false
                : true
            }
          >
            Cancel Order
          </Button>
        </div>
        <div className={classes.orderDetailHolder__itemInfo}>
          <Collapse accordion>
            {props?.orders?.map((val, index) => {
              return (
                <Panel header={`${val?.foodName}`} key={index}>
                  <p>Quantity : {val.foodQuantity}</p>
                  <p>Price : {val?.foodPrice} BIRR</p>

                  <Button
                    style={{ marginTop: "1rem", width: "fit-content" }}
                    onClick={(e) => {
                      navigator("/details/" + val.foodId);
                    }}
                  >
                    View Product
                  </Button>
                </Panel>
              );
            })}
          </Collapse>

          <p style={{ marginTop: "1rem", color: "green" }}>
            Total Price : {props.total} ETB{" "}
          </p>
          <p>Delivery Charge : 30 ETB</p>
        </div>
      </div>
    </>
  );
}

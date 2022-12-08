import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersbyUser,
  getOrdersComplete,
} from "../../redux/actions/orderActions";
import { useCookies } from "react-cookie";

import classes from "./account.module.scss";

import { Collapse } from "antd";

import { CircularProgress } from "@mui/material";
const { Panel } = Collapse;
import Row from "./orderDetail";

import { Tag } from "antd";

import { Spin } from "antd";

export default function UserOrder(params) {
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    // fetchAllOrders();
    // dispatch(getOrdersbyUser(2));
    dispatch(getOrdersbyUser(cookies.uid));
  }, []);

  const orders = useSelector((state) => state.order.orders);
  const orderLoad = useSelector((state) => state.order.loading);

  console.log("order info from user order file ");
  console.log(orders);
  return (
    <>
      <div className={classes.userOrderHolder}>
        <Tag color="aquamarine">Waiting</Tag>
        <Tag color="lightcoral">Cancelled</Tag>
        <Tag color="lightskyblue">Shipped</Tag>
        <Tag color="green">Complete</Tag>

        <Collapse accordion={true}>
          {!orders?.length > 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
                padding: "3rem",
              }}
            >
              <Spin />
            </div>
          ) : (
            orders?.map((val, index) => {
              return (
                <>
                  {val.status === "cancel"
                    ? console.log("cancel")
                    : val.status === "pending"
                    ? console.log("pending")
                    : val.status === "complete"
                    ? console.log("complete")
                    : val.status === "inProgress"
                    ? console.log("inProgress")
                    : console.log("")}
                  <Panel
                    className={
                      val.status === "cancel"
                        ? classes.userOrderHolder__collapser__cancelled
                        : val.status === "pending"
                        ? classes.userOrderHolder__collapser__pending
                        : val.status === "complete"
                        ? classes.userOrderHolder__collapser__complete
                        : val.status === "inProgress"
                        ? classes.userOrderHolder__collapser__inProgress
                        : ""
                    }
                    header={`Date: ${val.date} / Total : ${val.total}`}
                    key={index}
                  >
                    <Row
                      key={val.id}
                      id={val.id}
                      fname={val.fname}
                      lname={val.lname}
                      contact={val.contact}
                      user={val.userId}
                      total={val.total}
                      date={val.date}
                      status={val.status}
                      address={val.address}
                      // orders={val.orders}
                      longitude={val.longitude}
                      latitude={val.latitude}
                      admin={true}
                    />
                  </Panel>
                </>
              );
            })
          )}
        </Collapse>
      </div>
    </>
  );
}

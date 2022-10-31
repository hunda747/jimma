import React from "react";
import "./csrtShow.css";

import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "@material-ui/icons";

export default function CartShow(props) {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce(
      (qtyCounter, item) => Number(item.qtyCounter) + qtyCounter,
      0
    );
  };

  return (
    <div className="cartShow">
      <Link to="/checkout">
        {" "}
        <ShoppingCart className="icon" />{" "}
        <span className="icon">{getCartCount()}</span>
      </Link>
    </div>
  );
}

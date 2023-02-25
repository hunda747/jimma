import React from "react";
import "./csrtShow.css";

import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@mui/material";
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
      <Fab
        size="medium"
        // color="secondary"
        aria-label="cart"
        style={{
          padding: "12px",
          height: "100%",
          width: "100%",
          backgroundColor: "rgb(255 219 0)",
        }}
      >
        <Link to="/checkout">
          {" "}
          <ShoppingCart className="icon" />{" "}
          <span className="icon bold">{getCartCount()}</span>
        </Link>
      </Fab>
    </div>
  );
}

// <Box sx={{ '& > :not(style)': { m: 1 } }}>
//   <Fab size="small" color="secondary" aria-label="add">
//     <AddIcon />
//   </Fab>

// </Box>

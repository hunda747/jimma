import React from "react";
import "./csrtShow.css";

import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@mui/material";
import { ShoppingCart } from "@material-ui/icons";

import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartShow(props) {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [cartCount, setCartCount] = useState(cartItems.reduce(
    (qtyCounter, item) => Number(item.qtyCounter) + qtyCounter,
    0
  ))

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
          padding: "14px",
          height: "100%",
          width: "100%",
          backgroundColor: "rgb(255 219 0)",
        }}
      >
        <Link to="/checkout">
          {/* <IconButton aria-label="cart">
            <StyledBadge
              badgeContent={getCartCount()}
              className="icon"
              // anchorOrigin={{
              //   vertical: "bottom",
              //   horizontal: "right",
              // }}
              // color="secondary"
            >
              <ShoppingCart />
            </StyledBadge>
          </IconButton> */}
          <Badge badgeContent={cartCount}
            // overlap='circular'
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ color: 'black' }}
            // color='warning'
            // overlap="circular"
            showZero={true}
          >
            <ShoppingCartIcon fontSize='large'></ShoppingCartIcon>
          </Badge>

          {/* <span className="icon bold">{getCartCount()}</span> */}
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

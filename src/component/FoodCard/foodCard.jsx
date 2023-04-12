import React from "react";
import "./foodCard.css";

import add from "../../assets/photo/add.png";

import { Favorite, SearchIcon, Add } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { message } from "antd";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { IconButton } from "@mui/material";

export default function DetailView(props) {
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
  // console.log(props.type);

  const countFood = () => {
    let count = 0;
    cartItems?.map((cart) => {
      if (isFood(cart.type)) {
        console.log(cart.type);
        count = count + cart.qtyCounter;
      }
    });
    return count;
  };

  const countDrink = () => {
    let count = 0;
    cartItems?.map((cart) => {
      if (isDrink(cart.type)) {
        count = count + cart.qtyCounter;
      }
    });
    return count;
  };

  const isFood = (food) => {
    if (
      food.toLowerCase() != "drink" &&
      food.toLowerCase() != "bottled water" &&
      food.toLowerCase() != "beverages" &&
      food.toLowerCase() != "juice" &&
      food.toLowerCase() != "shake"
    )
      return true;
    else return false;
  };

  const isDrink = (food) => {
    if (
      food.toLowerCase() === "drink" ||
      food.toLowerCase() === "bottled water" ||
      food.toLowerCase() === "beverages" ||
      food.toLowerCase() === "juice" ||
      food.toLowerCase() === "shake"
    )
      return true;
    else return false;
  };

  const handleAdd = () => {
    // console.log(cartItems);
    console.log(countFood());
    if (cartItems.length === 0) {
      dispatch(
        addToCart(
          props.id,
          props.name,
          props.price,
          1,
          props.restaurant,
          props.type
        )
      );
      message.success("added to cart");
    } else if (props?.restaurant === cartItems[0]?.restaurant) {
      console.log(isDrink(props.type));
      if (isDrink(props.type)) {
        if (countDrink() >= 3) {
          message.error({
            content: "You can only order max 3 drink",
            // style: {
            //   marginTop: "10vh",
            // },
          });
        } else {
          dispatch(
            addToCart(
              props.id,
              props.name,
              props.price,
              1,
              props.restaurant,
              props.type
            )
          );
          message.success("added to cart");
        }
      } else if (countFood() >= 3) {
        message.error({
          content: "You can only order max 3 foods",
          // style: {
          //   marginTop: "10vh",
          // },
        });
      } else if (props.restaurant === cartItems[0].restaurant) {
        dispatch(
          addToCart(
            props.id,
            props.name,
            props.price,
            1,
            props.restaurant,
            props.type
          )
        );
        message.success("added to cart");
      }
    } else {
      // message.error("You can only order from one restarant");
      message.error({
        content: "You can only order from one restarant",
        style: {
          zIndex: 100000000,
          marginTop: "10vh",
        },
      });
    }
  };

  return (
    <div className="foodCard">
      <div className="name">
        <h3>{props.name}</h3>
        <p>{props.desc}</p>
      </div>
      <div className="infos">
        <div className="price">
          <p>{props.price}</p>
          <p>ETB</p>
        </div>
        <div className="add" onClick={handleAdd}>
          <IconButton>
            <Add className="addIcon" />
          </IconButton>
          {/* <img src={add} height={'30px'} alt="ADD" /> */}
        </div>
      </div>
    </div>
  );
}

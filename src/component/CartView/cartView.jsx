import React, { useEffect, useState } from "react";
import "./cartView.css";

import { ShoppingCart, Delete, Add, Remove } from "@material-ui/icons";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  addToCart,
  changeToCart,
  clearCart,
} from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function CartView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //handle total price calculation
  const getTotalProductPrice = () => {
    return cartItems.reduce(
      (price, item) => item.price * item.qtyCounter + price,
      0
    );
  };

  const [deliveryPrice, setDeliveryPrice] = useState(35);
  const [totalPrice, setTotalPrice] = useState(getTotalProductPrice());

  useEffect(() => {
    setTotalPrice(getTotalProductPrice());
  }, [cart]);

  const handleAdd = (cart) => {
    // console.log(cartItems);
    console.log(countFood());
    if (cart?.restaurant === cartItems[0]?.restaurant) {
      console.log(isDrink(cart.type));
      if (isDrink(cart.type)) {
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
              cart.id,
              cart.name,
              cart.price,
              1,
              cart.restaurant,
              cart.type
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
      } else if (cart.restaurant === cartItems[0].restaurant) {
        dispatch(
          addToCart(
            cart.id,
            cart.name,
            cart.price,
            1,
            cart.restaurant,
            cart.type
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

  return (
    <div className="cart">
      <div className="head">
        <h1>
          <ShoppingCart fontSize="medium" /> Cart
        </h1>
      </div>
      {cartItems?.map((cart) => {
        return (
          <div className="product">
            <p className="name">{cart.food_name}</p>

            <div className="qty">
              <div
                onClick={() => {
                  handleAdd(cart);
                  // dispatch(addToCart(cart.id));
                }}
              >
                <Add className="icons" fontSize="small" />
              </div>
              <div className="number">{cart.qtyCounter}</div>

              <div
                onClick={() => {
                  if (cart.qtyCounter === 1) {
                    dispatch(removeFromCart(cart.id));
                  } else {
                    dispatch(changeToCart(cart.id, cart.qtyCounter - 1));
                  }
                }}
              >
                <Remove className="icons" fontSize="small" />
              </div>
            </div>

            <p className="price">{cart.price} Birr</p>
          </div>
        );
      })}
      {totalPrice ? (
        <div className="total">
          {/* <p>Price: {totalPrice} Birr</p>
            <p>Delivery price: {deliveryPrice} Birr</p>
            <p>Total: {totalPrice + deliveryPrice} Birr</p> */}
          <table align="right">
            <tr>
              <td>Price:</td>
              <td>{totalPrice} Birr</td>
            </tr>
            <tr>
              <td>Delivery price:</td>
              <td>{deliveryPrice} Birr</td>
            </tr>
            <tr className="bold">
              <td>Total: </td>
              <td>{totalPrice + deliveryPrice} Birr</td>
            </tr>
          </table>
        </div>
      ) : (
        <div>
          <p>Empty</p>
        </div>
      )}

      <div className="checkout">
        <button className="button-32" onClick={() => navigate("/checkout")}>
          Checkout
        </button>
      </div>
      <div style={{ width: "100%", display: "flex", paddingRight: "10px" }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch(clearCart())}
          sx={{ marginLeft: "auto" }}
        >
          clear
        </Button>
      </div>
    </div>
  );
}
{
  /* <div className='action'  onClick={() => {
  // console.log(cart.id);
  dispatch(removeFromCart(cart.id))
}} ><Delete color='red'/>
</div> */
}

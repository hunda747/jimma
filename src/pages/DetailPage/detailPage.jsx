import React, { useState, useEffect } from "react";
import "./detailPage.scss";

import photo from "../../assets/photo/bj5.jpg";
import BurgerSvg from "../../assets/svg/burger.js";

import pizzaIcon from "../../assets/svg/pizza.png";
import burgerIcon from "../../assets/svg/hamburger.png";
import chickenIcon from "../../assets/svg/chicken.png";
import drinkIcon from "../../assets/svg/drink.png";
import fishIcon from "../../assets/svg/fish.png";
import lunchIcon from "../../assets/svg/lunch.png";
import steakIcon from "../../assets/svg/steak.png";
import saladIcon from "../../assets/svg/salad.png";
import soupIcon from "../../assets/svg/soup.png";
import firfirIcon from "../../assets/svg/firfir.jpg";
import shiroIcon from "../../assets/svg/shiro.png";
import riceIcon from "../../assets/svg/rice.png";

import extraIcon from "../../assets/svg/extra.png";
import friedIcon from "../../assets/svg/fried.png";
import sandwichIcon from "../../assets/svg/sandwich.png";
import snackIcon from "../../assets/svg/snack.png";

import breakfastIcon from "../../assets/svg/bbreakfast.png";
import shawaIcon from "../../assets/svg/shawa.png";
import shakeIcon from "../../assets/svg/shake.png";
import iftarIcon from "../../assets/svg/iftar.png";

import { Favorite, SearchIcon } from "@material-ui/icons";
import { ShoppingCart, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

import Navbar from "../../component/Layout/Navbar/navbar";
// import Navbar from "../../component/Navbar/navbar";
import DisplayStars from "../../component/displayStar";
import FoodCard from "../../component/FoodCard/foodCard";
import CartView from "../../component/CartView/cartView";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useParams } from "react-router-dom";
import CartShow from "../../component/CartShow/cartShow";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById } from "../../redux/actions/restaurantAction";
import { getFoodsByRestaurant } from "../../redux/actions/foodAction";
import { removeFromCart } from "../../redux/actions/cartActions";

import { CircularProgress } from "@material-ui/core";
import { useCookies } from "react-cookie";
import Footer from "../../component/Footer/footer";

export default function DetailView() {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantById(id));
    dispatch(getFoodsByRestaurant(id));
  }, []);

  const restaurants = useSelector((state) => state.restaurant.restaurant);
  const allFoods = useSelector((state) => state.food);
  const { loading, food, error } = allFoods;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [types, setTypes] = useState([]);

  useEffect(() => {
    findTypes();
  }, [food]);

  const findTypes = () => {
    if (food) {
      // console.log(types);
      let typeItems = [];
      food?.map((fo) => {
        if (!typeItems?.includes(fo.type)) {
          typeItems.push(fo.type);
        } else {
        }
      });
      setTypes(typeItems);

      // console.log(types);
    }
  };

  // // console.log(restaurants);
  let restaurant = {};
  restaurants?.map((rest) => {
    restaurant = rest;
  });

  const handleDelete = (e) => {
    // console.log(e);
    // dispatch(removeFromCart(_id))
  };
  // // console.log(foods);

  return (
    <>
      {loading ? (
        <>
          <div className="loader">
            <div class="container">
              <svg width="100" height="100" viewBox="0 0 300 300">
                <defs>
                  <linearGradient
                    id="gradient-fill"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="300"
                    x2="300"
                    y2="0"
                  >
                    <stop offset="0%">
                      <animate
                        attributeName="stop-color"
                        values="#00E06B;#CB0255;#00E06B"
                        dur="5s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%">
                      <animate
                        attributeName="stop-color"
                        values="#04AFC8;#8904C5;#04AFC8"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                  <clipPath id="clip">
                    <rect
                      class="square s1"
                      x="0"
                      y="0"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s2"
                      x="100"
                      y="0"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s3"
                      x="200"
                      y="0"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s4"
                      x="0"
                      y="100"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s5"
                      x="200"
                      y="100"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s6"
                      x="0"
                      y="200"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s7"
                      x="100"
                      y="200"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                  </clipPath>
                </defs>
                <rect
                  class="gradient"
                  clip-path="url('#clip')"
                  height="300"
                  width="300"
                ></rect>
              </svg>
            </div>
          </div>
        </>
      ) : error ? (
        <>Server Error</>
      ) : (
        <></>
      )}
      <CartShow />
      <div className="navbar_holder">
        <Navbar />
      </div>
      <div className="detail">
        <div className="image">
          <img src={restaurant.img} alt="image" />
        </div>
        <div className="container">
          <div className="information">
            <h1>{restaurant.name}</h1>
            {/* <div className="rating">
              <p>
                <DisplayStars rating={4} />
              </p>
            </div> */}
            <div className="moreInfo">
              <div className="disc">
                <p>{restaurant.description}</p>
              </div>
              <div className="time">
                <p>{restaurant.open_days}</p>
                <p>{restaurant.working_hour}</p>
              </div>
            </div>
          </div>
          <div className="menu">
            <h2>Menu</h2>
            <div className="menu_container">
              <div className="typeFood">
                {
                  // types ?
                  types?.length > 0
                    ? types?.map((type, key) => {
                        const filter = food?.filter(
                          (food) => food.type === type
                        );
                        const pan0el = "panel" + console.log(filter);
                        // // console.log(key);
                        return (
                          <Accordion
                            expanded={expanded === `panel${key + 1}`}
                            onChange={handleChange(`panel${key + 1}`)}
                            className="accordion"
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <Typography
                                sx={{ flexShrink: 0 }}
                                style={{
                                  textTransform: "capitalize",
                                  fontFamily: "sans-serif",
                                }}
                                className="foodType"
                              >
                                <div className="icon">
                                  {type.toLowerCase() === "pizza" ? (
                                    <img src={pizzaIcon} alt="" />
                                  ) : type.toLowerCase() === "burger" ? (
                                    <img src={burgerIcon} alt="" />
                                  ) : type.toLowerCase() === "chicken" ? (
                                    <img src={chickenIcon} alt="" />
                                  ) : type.toLowerCase() === "drink" ? (
                                    <img src={drinkIcon} alt="" />
                                  ) : type.toLowerCase() === "fish" ? (
                                    <img src={fishIcon} alt="" />
                                  ) : type.toLowerCase() === "lunch" ? (
                                    <img src={lunchIcon} alt="" />
                                  ) : type.toLowerCase() === "steak" ? (
                                    <img src={steakIcon} alt="" />
                                  ) : type.toLowerCase() === "beef" ? (
                                    <img src={steakIcon} alt="" />
                                  ) : type.toLowerCase() === "salad" ? (
                                    <img src={saladIcon} alt="" />
                                  ) : type.toLowerCase() === "soup" ? (
                                    <img src={soupIcon} alt="" />
                                  ) : type.toLowerCase() === "shake" ? (
                                    <img src={shakeIcon} alt="" />
                                  ) : type.toLowerCase() === "iftar" ? (
                                    <img src={iftarIcon} alt="" />
                                  ) : type.toLowerCase() === "fasting" ? (
                                    <img src={iftarIcon} alt="" />
                                  ) : type.toLowerCase() === "juice" ? (
                                    <img src={shakeIcon} alt="" />
                                  ) : type.toLowerCase() === "bottled water" ? (
                                    <img src={drinkIcon} alt="" />
                                  ) : type.toLowerCase() === "beverages" ? (
                                    <img src={drinkIcon} alt="" />
                                  ) : type.toLowerCase() === "shiro" ? (
                                    <img src={shiroIcon} alt="" />
                                  ) : type.toLowerCase() === "firfir" ? (
                                    <img src={firfirIcon} alt="" />
                                  ) : type.toLowerCase() === "rice" ? (
                                    <img src={riceIcon} alt="" />
                                  ) : type.toLowerCase() === "extra" ? (
                                    <img src={extraIcon} alt="" />
                                  ) : type.toLowerCase() === "fried" ? (
                                    <img src={friedIcon} alt="" />
                                  ) : type.toLowerCase() === "sandwich" ? (
                                    <img src={sandwichIcon} alt="" />
                                  ) : type.toLowerCase() === "breakfast" ? (
                                    <img src={breakfastIcon} alt="" />
                                  ) : type.toLowerCase() === "shawa" ? (
                                    <img src={shawaIcon} alt="" />
                                  ) : type.toLowerCase() === "snack" ? (
                                    <img src={snackIcon} alt="" />
                                  ) : (
                                    <img src={lunchIcon} alt="" />
                                  )}
                                </div>
                                {type}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="detailFood">
                              {filter?.length !== 0 ? (
                                <>
                                  <div className="displayMenu">
                                    {filter?.map((food, index) => {
                                      // // console.log(food);
                                      return (
                                        <div className="menuItem">
                                          <FoodCard
                                            key={food.id}
                                            id={food.id}
                                            name={food.food_name}
                                            desc={food.description}
                                            price={food.price}
                                            restaurant={food.restaurantsId}
                                            type={food.type}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <p>Not Available</p>
                                </div>
                              )}
                            </AccordionDetails>
                          </Accordion>
                        );
                      })
                    : ""
                  // : "no type"
                }
              </div>
              <div className="cartView">
                <CartView />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

{
  /* <Accordion
                            expanded={expanded === `panel${(key + 1)}`}
                            onChange={handleChange(`panel${(key + 1)}`)}
                            className="accordion"
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <Typography sx={{ flexShrink: 0 }} style={{ textTransform: 'capitalize', fontFamily: 'sans-serif'}}>
                                {type}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {filter?.length !== 0 ? (
                                <>
                                  <div className="displayMenu">
                                    {filter?.map((food, index) => {
                                      // console.log(food);
                                      return (
                                        <div className="menuItem">
                                          <FoodCard
                                            key={food.id}
                                            id={food.id}
                                            name={food.food_name}
                                            desc={food.description}
                                            price={food.price}
                                            restaurant={food.restaurantsId}
                                            type={food.type}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <p>Not Available</p>
                                </div>
                              )}
                            </AccordionDetails>
                          </Accordion> */
}

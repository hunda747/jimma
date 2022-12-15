import React, { useState, useEffect } from "react";
import "./feature.scss";
import { featureData } from "../Feature/featureData.jsx";

import { Link } from "react-router-dom";
import imageUrl from "../../assets/photo/crust_full_pizza.png";
// import imageUrl from "../../assets/photo/half_pizza_C.png";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigate } from "react-router-dom";

export default function Feature() {
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const autoScroll = true;

  let slideInterval;
  let intervalTime = 7000;

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }
  const nextSlide = () => {
    setCurrent(current === featureData.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? featureData.length - 1 : current - 1);
  };

  useEffect(() => {
    setCurrent(0);
  }, []);
  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [current]);

  const handleSearch = () => {
    console.log("in search");
    if (search === "") {
      console.log("empty");
    } else {
      navigate(`/search/${search}`);
    }
  };

  return (
    <div className="slider">
      {featureData.map((slide, index) => {
        console.log(index);
        return (
          <div className="sliderImageContainer" key={index}>
            <div className={index === current ? "slide current" : "slide"}>
              {index === current && (
                <div className="imgHolder">
                  <div className="imageCOntainer">
                    <img src={imageUrl} alt={slide.heading} />
                  </div>
                  {/* <img src={slide.image} alt={slide.heading} /> */}
                  <div className="contentHolder_new">
                    <div className="content_new">
                      <h2>Order Food To Your Home Or Office.</h2>
                      <h3>{slide.info}</h3>

                      <div className="searchBarHolder">
                        <input
                          type="text"
                          className="searchInput active"
                          placeholder="Search"
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                        <SearchIcon onClick={() => handleSearch()} />
                      </div>

                      <p>
                        <a href="/login">Sign In</a> for your recent addresses
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

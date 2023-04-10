import React from "react";
import classes from "./infinitScroll.module.scss";

// import photo1 from "../../assets/photo/bj5.jpg";
// import photo2 from "../../assets/photo/pasta.jpg";
// import photo3 from "../../assets/photo/pizza.jpg";
// import photo4 from "../../assets/photo/tolo.png";
// import photo5 from "../../assets/photo/add.png";
import photo1 from "../../assets/photo/slidePhoto1.webp";
import photo2 from "../../assets/photo/slidePhoto2.webp";
import photo3 from "../../assets/photo/slidePhoto3.png";
import photo4 from "../../assets/photo/slidePhoto4.webp";
import photo5 from "../../assets/photo/slidePhoto5.webp";
import photo6 from "../../assets/photo/slidePhoto6.webp";
import photo7 from "../../assets/photo/slidePhoto7.webp";
import photo8 from "../../assets/photo/slidePhoto8.png";
import photo9 from "../../assets/photo/slidePhoto9.png";
import photo10 from "../../assets/photo/slidePhoto10.png";

export default function InfinitScroll() {
  return (
    <div className={classes.scroller}>
      <div className={classes.scroller__content}>
        <div className={classes.scroller__content__item1}>
          <div>
            <img src={photo1} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo2} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo3} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo6} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo5} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo10} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo7} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo4} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo9} height="100%" width="100%" alt="" />
          </div>
        </div>
        <div className={classes.scroller__content__item2}>
          <div>
            <img src={photo1} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo2} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo3} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo6} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo5} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo10} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo7} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo4} height="100%" width="100%" alt="" />
          </div>
          <div>
            <img src={photo9} height="100%" width="100%" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

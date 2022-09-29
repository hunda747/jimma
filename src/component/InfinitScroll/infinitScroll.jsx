import React from 'react'
import classes from './infinitScroll.module.scss'
export default function InfinitScroll() {



  return (
    <div className={classes.scroller}>
        <div className={classes.scroller__content}>
                <div className={classes.scroller__content__item1} >
                    <div>img1</div>
                    <div>img2</div>
                    <div>img3</div>
                    <div>img4</div>
                    <div>img5</div>
                    <div>img6</div>
                    <div>img7</div>
                    <div>img8</div>
                    <div>img9</div>
                </div>
                <div className={classes.scroller__content__item2}>
                    <div>img1</div>
                    <div>img2</div>
                    <div>img3</div>
                    <div>img4</div>
                    <div>img5</div>
                    <div>img6</div>
                    <div>img7</div>
                    <div>img8</div>
                    <div>img9</div>
                </div>
        </div>
    </div>
  )
}

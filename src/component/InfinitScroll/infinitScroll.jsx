import React from 'react'
import classes from './infinitScroll.module.scss'

import photo1 from '../../assets/photo/bj5.jpg'
import photo2 from '../../assets/photo/pasta.jpg'
import photo3 from '../../assets/photo/pizza.jpg'
import photo4 from '../../assets/photo/tolo.png'
import photo5 from '../../assets/photo/add.png'

export default function InfinitScroll() {

  return (
    <div className={classes.scroller}>
        <div className={classes.scroller__content}>
                <div className={classes.scroller__content__item1} >
                    <div><img src={photo1} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo2} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo3} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo1} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo2} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo2} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo1} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo2} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo3} height="100%" width="100%" alt="" /></div>
                </div>
                <div className={classes.scroller__content__item2}>
                    <div><img src={photo1} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo2} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo3} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo1} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo2} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo2} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo1} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo2} height="100%" width="100%" alt="" /></div>
                    <div><img src={photo3} height="100%" width="100%" alt="" /></div>
                </div>
        </div>
    </div>
  )
}

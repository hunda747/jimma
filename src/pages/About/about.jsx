import React from 'react'

import  './about.scss'
import Navbar from '../../component/Navbar/navbar'

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
// import { Gradient } from './Gradient'
import { useEffect,useState } from 'react'

import Footer from '../../component/Footer/footer'
export default function About() {

    
    //  useEffect(()=>{
    //     const gradient = new Gradient()
    //     gradient.initGradient('#gradient-canvas')
    // },[])


  return (


    <>
        <Navbar />  

        
        <div className="aboutpageContainer">
                <div className="aboutPage">
                        <div className="aboutInfo">
                            <h1>About Us</h1>
                            <p>
                            April seriously wondered about her sleeping partner choices. She looked at her bed and what a mess it had become. How did she get to the point in her life where she had two dogs, three cats, and a raccoon sleeping with her every night?

                            </p>
                            <p>
                            There were only two ways to get out of this mess if they all worked together. The problem was that neither was all that appealing. One would likely cause everyone a huge amount of physical pain while the other would likely end up with everyone in jail. In Sam's mind, there was only one thing to do. He threw everyone else under the bus and he secretly sprinted away leaving the others to take the fall without him.
                            </p>
                        </div>
                        

                        <div className="aboutWork">
                          <h2>You Get</h2>
                            <div className="aboutWorkHolder">
                                  <div className="deliveryWork">
                                      <p>Deliver to your door step</p>
                                      <DirectionsBikeIcon/>
                                  </div>
                                  <div className="saveTime">
                                      <p>Save Time</p>
                                      <AvTimerIcon/>
                                  </div>
                                  <div className="cleanSpace">
                                      <p>Clean and Efficient Delivery</p>
                                      <BathtubOutlinedIcon/>
                                  </div>
                                  <div className="lowerPrice">
                                      <p>Affordable Delivery Price</p>
                                      <LocalAtmOutlinedIcon/>
                                  </div>
                            </div>
                        </div>




                        <div className="visitLocations">
                              <h2>Visit Us at Jima</h2>
                              <span></span>

                              <div className='visitSlideShowContainer'>
                                  <div className="visitSlideShow1">
                                      <div><img src="https://questethiopiatours.com/wp-content/uploads/Harar-Quest-Ethiopia-Tours.jpg.webp"   height="100%" width="100%"  alt="" /></div>
                                      <div><img src="https://questethiopiatours.com/wp-content/uploads/Hawassa-Quest-Ethiopia-Tours1.jpg.webp" height='100%' width='100%' alt="" /></div>
                                      <div><img src="https://questethiopiatours.com/wp-content/uploads/Jimma-Quest-Ethiopia-Tours.jpg.webp" height='100%' width='100%' alt="" /></div>
                                      <div><img src="https://tse3.mm.bing.net/th?id=OIP.p9Qo0rY7wuQjwjogbSMYfwHaF8&pid=Api&P=0" height='100%' width='100%' alt="" /></div>
                                  </div>
                                  <div className="visitSlideShow2">
                                      <div><img src="https://questethiopiatours.com/wp-content/uploads/Harar-Quest-Ethiopia-Tours.jpg.webp"   height="100%" width="100%"  alt="" /></div>
                                      <div><img src="https://questethiopiatours.com/wp-content/uploads/Hawassa-Quest-Ethiopia-Tours1.jpg.webp" height='100%' width='100%' alt="" /></div>
                                      <div><img src="https://questethiopiatours.com/wp-content/uploads/Jimma-Quest-Ethiopia-Tours.jpg.webp" height='100%' width='100%' alt="" /></div>
                                      <div><img src="https://tse3.mm.bing.net/th?id=OIP.p9Qo0rY7wuQjwjogbSMYfwHaF8&pid=Api&P=0" height='100%' width='100%' alt="" /></div>
                                  
                                  </div>
                              </div>

                        </div>
                      
                        
                </div>
        
                
        </div>
        {/* <canvas id="gradient-canvas" data-js-darken-top data-transition-in >   
          </canvas> 
         */}
      <Footer/>

  
      </>
  
   
  )
}

import React from 'react'

import  './about.scss'
import Navbar from '../../component/Navbar/navbar'

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import { Gradient } from './Gradient'
import { useEffect,useState } from 'react'

import Footer from '../../component/Footer/footer'
export default function About() {

    const [loaderCount , setLoaderCount] = useState(true)
     useEffect(()=>{
        const gradient = new Gradient()
        gradient.initGradient('#gradient-canvas')
    },[])

    const autoScroll = true;

    let slideInterval;
    let intervalTime = 2000
  
    function auto (){
      slideInterval = setInterval(nextSlide,  intervalTime)
    }

    const nextSlide = ()=>{
      setLoaderCount(!loaderCount)
    }

    useEffect(()=>{
      if(autoScroll){
         auto()
      }
      return ()=>  clearInterval(slideInterval)
   }, [])  
  
  return (


    <>
    <Navbar />
    {
      loaderCount?
      <div className='loader' style={{}} >
      <div class="container">
         <svg width="100" height="100" viewBox="0 0 300 300">
           <defs>
             <linearGradient id="gradient-fill" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="300" y2="0">
               <stop offset="0%">
                 <animate attributeName="stop-color" values="#00E06B;#CB0255;#00E06B" dur="5s" repeatCount="indefinite" />
               </stop>
               <stop offset="100%">
                 <animate attributeName="stop-color" values="#04AFC8;#8904C5;#04AFC8" dur="8s" repeatCount="indefinite" />
               </stop>
             </linearGradient>
             <clipPath id="clip">
               <rect class="square s1" x="0" y="0" rx="12" ry="12" height="90" width="90"></rect>
               <rect class="square s2" x="100" y="0" rx="12" ry="12" height="90" width="90"></rect>
               <rect class="square s3" x="200" y="0" rx="12" ry="12" height="90" width="90"></rect>
               <rect class="square s4" x="0" y="100" rx="12" ry="12" height="90" width="90"></rect>
               <rect class="square s5" x="200" y="100" rx="12" ry="12" height="90" width="90"></rect>
               <rect class="square s6" x="0" y="200" rx="12" ry="12" height="90" width="90"></rect>
               <rect class="square s7" x="100" y="200" rx="12" ry="12" height="90" width="90"></rect>
             </clipPath>
           </defs>
           <rect class="gradient" clip-path="url('#clip')" height="300" width="300"></rect>
         </svg>
       </div>
   </div>
   :
   <>
    
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
 
     <canvas id="gradient-canvas" data-js-darken-top data-transition-in >     
      
      </canvas> 
  
    
  <Footer/>
   
   </>
    }
   
         
     
      
     


  
      </>
  
   
  )
}

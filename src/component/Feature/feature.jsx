import React, {useState , useEffect} from 'react'
import './feature.scss'
import {featureData} from '../Feature/featureData.jsx'

import { Link } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';


export default function Feature() {

  const [current, setCurrent] = useState(0)
  


  const autoScroll = true;

  let slideInterval;
  let intervalTime = 7000

  function auto (){
    slideInterval = setInterval(nextSlide,  intervalTime)
  }



  const nextSlide = ()=>{
    setCurrent(current === featureData.length -1 ?  0 : current + 1)
  }
  const prevSlide =()=>{
    setCurrent(current === 0?  featureData.length-1: current - 1)
  }
  useEffect(()=>{    
    setCurrent(0)  
  
  },[])

  useEffect(()=>{
     if(autoScroll){
        auto()
     }
     return ()=>  clearInterval(slideInterval)
  }, [current])  


  return (
    <div className='slider' >
       
    
        {
          featureData.map((slide,index)=>{
            console.log(index)
            return(
              <div className='sliderImageContainer' key={index}>
                  <div className={index === current ? 'slide current' : 'slide'}>
                      {
                        index === current && (
                          <div className='imgHolder'>
                            <img src={slide.image} alt={slide.heading} />
                            <div className='content'>
                                <h2>{slide.heading}</h2>  
                                 <h3>{slide.info}</h3>      

                                 <div className="searchBarHolder">
                                      <input type="text"  placeholder='Search'/>
                                      <div className="searchBtnHolder">
                                          <SearchIcon  />
                                      </div>
                                 </div>

                            </div>
                          </div>
                        )
                      }
                  </div>
              </div>
            )
          })
        }
    
    </div>
    
  )
}

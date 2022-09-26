import { ConsoleSqlOutlined, LoadingOutlined } from '@ant-design/icons'
import { ExpandLessSharp } from '@material-ui/icons'
import React from 'react'

import DisplayStars from '../displayStar'
import './restaurantCard.scss'


export default function RestaurantCard({Name, image, rating, description,  id}) {  
  
  return (
      <>     
          {       
           
                    <div className='restaurantCard'  key={id}>
                      <div className="restaurantCardWrapper">
                        <img src={image} alt={Name} />
                                               
                              <div className='styleContentHolder'>                             
                                <div className="styleContent">    
                                    <h1>{Name}</h1>
                                    <h3><DisplayStars rating={rating} /></h3>
                                    {/* <p>{description}</p> */}
                                </div> 
                              </div>        

                      </div>
                  </div>
                
           
          }
        
        </>
   
       

    


   

    
  )
}

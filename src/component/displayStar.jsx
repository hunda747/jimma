import React from 'react'

import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function DisplayStars(props) {
  console.log(props.rating);
  return (
      <div className='cartItem'>
        <StarBorderIcon style={props.rating >=1? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}} />
        <StarBorderIcon style={props.rating >=2? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
        <StarBorderIcon style={props.rating >=3? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
        <StarBorderIcon style={props.rating >=4? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
        <StarBorderIcon style={props.rating >=5? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
      </div>
  )
}
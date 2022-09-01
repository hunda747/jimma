import React from 'react';
import './foodCard.css'

import photo from '../../assets/photo/bj5.jpg';
import pizza from '../../assets/photo/pizza.jpg';
import Footer from '../../component/Footer/footer'

import {Favorite, SearchIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom';


import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

export default function DetailView(props) {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(props.id, props.name, props.price, 1));
  }

  return(
    <div className='foodCard'>
      <div class="big">
        <article class="recipe">
          <div class="pizza-box">
            <img src={pizza} width="1500" height="1368" alt="" />
          </div>
          <div class="recipe-content">
            <p class="recipe-tags">
              {/* <span class="recipe-tag">Gluten Free</span>
              <span class="recipe-tag">Main dish</span> */}
            </p>

            <h1 class="recipe-title"><a href="#">{props.name}</a></h1>

            <p class="recipe-metadata">
              <span class="recipe-rating">★★★★<span>☆</span></span>
              <span class="recipe-votes">(12 votes)</span>
            </p>

            <p class="recipe-desc">{props.desc}</p>

            <button class="recipe-save" 
             onClick={handleAdd}
             type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000"><path d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z" fill="currentColor"/></svg>
              Save
            </button>

          </div>
        </article>
      </div>

      <div class="small">
        {/* <article class="recipe">
          <div class="pizza-box">
            <img src={photo}  width="1500" height="1368" alt=""/>
          </div>
          <div class="recipe-content">
            

            <h1 class="recipe-title"><a href="#">Gluten Free Pan Pizza</a></h1>

            <p class="recipe-metadata">
              <span class="recipe-rating">★★★★<span>☆</span></span>
              <span class="recipe-votes">(12 votes)</span>
            </p>

            <p class="recipe-desc">It really is possible to make excellent gluten free pizza at home in your own oven.</p>

            <p class="recipe-title">120 Birr</p>

            <button class="recipe-save" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000"><path d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z" fill="currentColor"/></svg>
              Save
            </button>

          </div>
        </article> */}
      </div>
    </div>
  )
};

{/* <p class="recipe-tags">
              <span class="recipe-tag">Gluten Free</span>
              <span class="recipe-tag">Main dish</span>
            </p> */}
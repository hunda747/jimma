import React from 'react';
import './footer.css';

import {Twitter, Instagram, Facebook, LinkedIn} from '@material-ui/icons';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="copy">
          Copywright 
        </div>
        <div className="icons">
          <Twitter />
          <Facebook />
          <Instagram />  
          <LinkedIn />
        </div>
      </div>
    </footer>
  )
}
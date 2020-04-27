
import React, { Component } from 'react';
import './Welcome.css';

import backimage from '../../images/background_image.png';

class Welcome extends Component {

  render() {
    return (

      <div className='Component-Bg'
        style={{
          height: "630px",
          backgroundImage: `url(${backimage})`,             
        }}>
        <ul>
          <li>
            <a href="/Login" className="button">Login</a>
          </li>
        </ul>
      </div>
    );
      }
    }
    
export default Welcome;
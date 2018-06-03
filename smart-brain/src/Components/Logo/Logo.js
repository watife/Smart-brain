import React from 'react';
import Tilt from "react-tilt";
import brain from "./brain.png";
import "./Logo.css";


const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt" options={{ max: 55 }} style={{ height: 75, width: 75 }} >
                <div className="Tilt-inner pa3"><img style={{ paddingTop: '5px' }} src={brain} alt="logo" /></div>
            </Tilt>
       </div>
    )
}


export default Logo;
import React from 'react';
import './Navigation.css'



const Navigation = ({onRouteChange, isSignedIn}) => {
    
        if (isSignedIn) {
            return (
                <nav className="navigation">
                    <p onClick={() => onRouteChange('Signout')} className=" f3 link dim black underline pa3 pointer" >Sign Out</p>
                </nav> 
            )
        } else {
            return (
                <nav className="navigation">
                    <p onClick={() => onRouteChange('SignIn')} className=" f3 link dim black underline pa3 pointer" >Sign In</p>
                    <p onClick={() => onRouteChange('Register')} className=" f3 link dim black underline pa3 pointer" >Register</p>
                </nav> 
            )
        }
        
}


export default Navigation;
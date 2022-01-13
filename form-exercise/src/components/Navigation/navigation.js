import React from "react";
import { Link} from "react-router-dom";
import './navigation.css'

export default function Navigation(){
    // Basic Navigation Bar for our Application using Link 
    return(
        <div id='nav'>
            <Link to="/" id='link-home'>Home</Link>
        </div>
    )
}
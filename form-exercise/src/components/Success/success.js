import React,{useEffect} from "react";
import { useLocation, useNavigate} from "react-router";
import { Link } from "react-router-dom";
import './success.css'


export default function Success(){
    const {state} = useLocation()
    // Here we utilitze useLocation to access our 'state' object which we passed in the main.js through useNavigate()
    // Essentially as a prop
    const navigate = useNavigate()
    // Above function will allow us to navigate back to home page

    // Decided to useEffect to create a setTimeout after the page mounts to send user back to home page after 4 seconds
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        },4500)
    },[navigate])

    return(
        <>
            {/* If we access url '/success' without the form we simply get a link to our home page */}
            {/* Other wise we use the name of the person whose succesfully submitted the page */}
            {state === null ? <Link to='/'><h1 id='success'>Go Back Home</h1></Link>:<h1 id='success'>Successfully Sumbited Form : Thank you {state.values.name}</h1>}
        </>
    )
}
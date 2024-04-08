import { Link, NavLink } from "react-router-dom"
import Button from '@mui/material/Button';
import { useState } from "react";


const Navbar = () => {
 
  let linkers = [
    {
      path: "/blog",
      name: "Blog"
    },
    {
      path: "/about",
      name: "About"
    },
    {
      path: "/login",
      name: "Login"
    },
  ]


  return (
    <>
    <nav className="custom-color lg:p-2">
      <marquee behavior="scroll" scrollamount="3" className="text-white poppins-medium-sm">
        <p>Welcome to 360Event, the ultimate platform for event management and planning. Join us today and take your event to the next level!</p>
      </marquee>
    </nav>
    <nav className="bg-white shadow-inner lg:py-5 lg:px-16 flex justify-between items-center poppins-medium sticky top-0 w-full">
        <Link to='/'>
          <h1>360Event</h1>
        </Link>
        <div className="lg:flex gap-7 items-center hidden">    
        {linkers.map((link, index) =>(
           <NavLink  to={link.path} key={index} className={({isActive}) => (isActive ? "text-black border-b-2 border-black rounded-sm p-1 poppins-medium-sm" : "text-gray-400 poppins-medium-sm")}>
             {link.name}
           </NavLink>
        ))}
        <Link to='/signup'>
        <Button variant="contained" className=""><p className="poppins-medium-sm">Get Started</p></Button>
        
        </Link>
        </div> 
    </nav>
    </>
  )
}

export default Navbar
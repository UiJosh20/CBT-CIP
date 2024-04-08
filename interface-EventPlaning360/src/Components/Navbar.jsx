import { Link, NavLink } from "react-router-dom"
// import Button from '@mui/material/Button';


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
    <nav className="bg-white shadow-md p-5 flex justify-between">
        <div>
          <h1>360Event</h1>
        </div>
        <div className="flex gap-7">    
        {linkers.map((link, index) =>(
           <NavLink  to={link.path} key={index}>
             {link.name}
           </NavLink>
        ))}
        <Link to='/signup'>
        {/* <Button variant="contained">Get Stated</Button> */}
        <button>Get Stated</button>
        </Link>
        </div> 
    </nav>
    </>
  )
}

export default Navbar
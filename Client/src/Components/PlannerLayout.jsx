import Navbar from "./Navbar"
import {Outlet} from "react-router-dom"

const PlannerLayout = () => {
  return (
    <>
    <section>
         <Navbar/>
         <Outlet/>
    </section>
    </>
  )
}

export default PlannerLayout
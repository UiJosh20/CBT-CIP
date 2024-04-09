import { Link } from "react-router-dom"
import Button from '@mui/material/Button';


const Home = () => {
  return (
    <>
    <section className=" lg:p-10 homeBg px-5">
    <div className=" lg:px-12 lg:py-28 py-20">
      <h1 className="poppins-extrabold-lg lg:text-black text-white ">Create and Track your event effectively</h1>
      <p className="poppins-regular lg:text-black text-white">we automate your planning and save you time for other things</p>
      <Link to='/signup' className="getStart ">
        <Button variant="contained" className="!font-bold !lg:mt-5 !mt-20 !lg:block !hidden">Get Started</Button>
        <Button variant="contained" className="!font-bold !lg:mt-5 !mt-20 !lg:hidden !block !p-3 !bg-black">Get Started</Button>
        
      </Link>
    </div>
    </section>
    {/* <section className="custom-background"></section> */}
    </>
  )
}

export default Home
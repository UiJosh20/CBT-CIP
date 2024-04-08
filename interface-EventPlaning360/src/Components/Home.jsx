import { Link } from "react-router-dom"
import Button from '@mui/material/Button';


const Home = () => {
  return (
    <>
    <section className=" p-10 homeBg">
    <div className=" lg:px-12 lg:py-28">
      <h1 className="poppins-extrabold-lg">Create and Track your event effectively</h1>
      <p className="poppins-regular">we automate your planning and save you time for other things</p>
      <Link>
        <Button variant="contained" className="!font-bold !mt-5 ">Get Started</Button>
      </Link>
    </div>
    </section>
    <section className="custom-background">

    </section>
    </>
  )
}

export default Home
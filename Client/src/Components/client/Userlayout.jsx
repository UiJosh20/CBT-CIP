import React, { useEffect, useState } from 'react'
import UserNav from './UserNav'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Userlayout = () => {
  const [loading, setLoading] = useState(true);
  const [tokenMatch, setTokenMatch] = useState(false);
  const JWT = "http://localhost:3000/jswtoken"
  const navigate = useNavigate()
  let token = localStorage.getItem("token")



  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        navigate("/");
        return; 
      }
  
      axios
        .post(JWT, { token })
        .then((response) => {
          if (token === response.data.token) {
            setTokenMatch(true);
            setLoading(false);
          } else {
            console.log("Token doesn't match");
            setLoading(false);
            setTokenMatch(false);
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setLoading(false);
          setTokenMatch(false);
          navigate("/");
        });
    };

    setInterval(checkToken, 5000);

    return () => {
      clearInterval(checkToken);
    }
  },[navigate])
  return (
    <>
    {loading ? (
      <section className='h-screen bg-black'>
       <div class="banter-loader">
       <div class="banter-loader__box"></div>
       <div class="banter-loader__box"></div>
       <div class="banter-loader__box"></div>
       <div class="banter-loader__box"></div>
       <div class="banter-loader__box"></div>
       <div class="banter-loader__box"></div>
       <div class="banter-loader__box"></div>
       <div class="banter-loader__box"></div>
       <div class="banter-loader__box"></div>
     </div>
      </section>
      ) : (
        <>
        <UserNav />
        <Outlet />
      </>
      )}
    </>
  )
}

export default Userlayout
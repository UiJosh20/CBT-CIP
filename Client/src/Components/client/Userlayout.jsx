import React from 'react'
import UserNav from './UserNav'
import { Outlet } from 'react-router-dom'

const Userlayout = () => {
  return (
    <>
    <UserNav/>
    <Outlet/>
    </>
  )
}

export default Userlayout
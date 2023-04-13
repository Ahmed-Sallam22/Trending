import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout({UserData ,setuserData}) {
  let navigate= useNavigate()
  function logout(){
    localStorage.removeItem('userToken')
    setuserData(null)
    navigate('/login')
  }
  return <>
    <Navbar logout={logout} UserData={UserData}/>
    <div className="container">
      <Outlet></Outlet>
    </div>
    
  </>
}

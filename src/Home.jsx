import React from 'react'

import Navbar from "./components/Navbar"
import Menu from "./components/Menu"

const Home = () => {
  return (
    <div className="bg-slate-100 ">
    <Navbar />
  
    <Menu />
    {/*  <UploadDataToFirebase />*/}
   </div>
  )
}

export default Home
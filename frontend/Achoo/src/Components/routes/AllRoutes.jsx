import React from "react"
import { Routes,Route } from "react-router-dom";

import About from "../About";
import Contact from "../Contact";
import Dashboard from "../Dashboard";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";

const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
    </>
  )
}

export default AllRoutes
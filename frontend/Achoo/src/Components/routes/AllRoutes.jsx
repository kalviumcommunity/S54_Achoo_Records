import React from "react"
import { Routes,Route } from "react-router-dom";

import About from "../About";
import Contact from "../Contact";
import Dashboard from "../Dashboard";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import AddData from "../AddData";
import EditData from "../EditData";

const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/create' element={<AddData />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/edit/:id' element={<EditData />} />
        </Routes>
    </>
  )
}

export default AllRoutes
import { useState } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import { ToastContainer } from 'react-toastify'

import { Route, Routes, Navigate } from 'react-router-dom'


function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/login' element={ <Login />} />
        <Route path='/dashboard' element={ <ProtectedRoute> <DashBoard />  </ProtectedRoute> } />
      </Routes>
    </div>
  )
}

export default App

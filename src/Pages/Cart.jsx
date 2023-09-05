import React from 'react'
import Navbar from '../components/Navbar'
import { useContext } from 'react'
import { NewContext } from '../context/context'

const Cart = () => {
  const {text, setText} = useContext(NewContext)
  return (
    <div>
        <Navbar/>
        <h1>Cart</h1>
        <h3>{text}</h3>
    </div>
  )
}

export default Cart
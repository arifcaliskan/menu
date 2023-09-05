import React from 'react'
import { useContext } from 'react'
import { NewContext } from '../context/context'

const Auth = () => {
  const {text, setText} = useContext(NewContext)
  return (
    <div>
      <h2>Auth</h2>
      <h3>{text}</h3>
    </div>
  )
}

export default Auth
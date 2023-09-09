import React, {useRef, useContext} from 'react'
import './login.css'
import {loginCall} from "../../apiCalls"
import { AuthContext } from '../../context/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const email = useRef()
  const password = useRef()

  const {user, isFetching, error, dispatch} = useContext(AuthContext);

  let history = useHistory()
  const handleClick = (e) => {
    e.preventDefault()
    loginCall({email:email.current.value, password:password.current.value}, dispatch)
    // history.push("/")
  }
  console.log(user)

  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and make a lot of new ones on the largest network on Earth.
          </span>
        </div>

        <div className='loginRight'>
          <form className="loginBox" onSubmit={handleClick}>
            <input 
            placeholder='Email or Phone number' 
            className="loginInput" 
            type='email'
            ref={email}
            required/>
            <input 
            placeholder='Password' 
            className="loginInput" 
            type="password" 
            ref={password}
            minLength="6"
            required/>

            <button 
            className="loginButton"
            disabled={isFetching} >
                {isFetching ? <CircularProgress color="success"/> : "Log In"}
            </button>

            <span className="loginForgot">Forgot Password?</span>
            <button className='loginRegisterButton'>
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

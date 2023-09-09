import React, { useRef } from 'react'
import "./register.css";
import axios from 'axios';
import { useHistory } from "react-router-dom"

export function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()

  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post("/auth/register", user)
        history.push("/login")
      } catch(err) {

      }
      
    }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and make a lot of new ones on the largest network on Earth.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input 
              placeholder="Username" 
              required 
              className="loginInput" 
              ref={username}
            />
            <input 
              placeholder="Email" 
              required 
              className="loginInput" 
              ref={email}
              type="email"
            />
            <input 
              placeholder="Password" 
              required 
              className="loginInput" 
              ref={password}
              type="password"
              minLength="6"
            />
            <input 
              placeholder="Password Again" 
              required 
              className="loginInput" 
              ref={passwordAgain}
              type="password"
              minLength="6"
            />
            <button className="loginButton" type="submit">Sign Up</button>

            <button className="loginRegisterButton" onClick={() => history.push("/login")}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
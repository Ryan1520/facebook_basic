import React, {useContext} from "react";
import { Home } from "./pages/home/Home";
import {Profile} from "./pages/profile/Profile";
import {Login} from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import {Info} from "./pages/info/Info";

// import { Rightbar } from "./components/rightbar/Rightbar";
import {AuthContextProvider} from "./context/AuthContext"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext)

  return (
    <Switch>
      <Route exact path='/'>
        {user ? <Home /> : <Register/>}
        {/* <Home /> */}
      </Route>
      <Route path='/login'>
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path='/register'>
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path='/profile/:id'>
        <Profile />
      </Route>
      <Route path='/info/:id'>
        <Info />
      </Route>
    </Switch>

    
    
    // <Switch>
    //   <Route exact path='/'>
    //     <Home />
    //   </Route>
    //   <Route path='/login'>
    //     <Login />
    //   </Route>
    //   <Route path='/register'>
    //     <Register />
    //   </Route>
    //   <Route path='/profile/:username'>
    //     <Profile />
    //   </Route>
    // </Switch>
    
    // <div>
    //   <Home />
    //   <Profile /> 
    //   <Login />
    //   <Register />
    // </div>
  );
}

export default App;

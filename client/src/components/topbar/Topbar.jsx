import React, {useContext} from 'react'
import './topbar.css'
import {Search, Person, Message, Notifications, Edit, Logout} from '@mui/icons-material';
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import fb_logo from './facebook-logo.png'

export const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const {user} = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.reload();
  }
  
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to='/' 
        style={{textDecoration:"none"}}>
          <div className='logo'>
            <div className='logo-img'>
              <img src={fb_logo} alt="" />
            </div>
            <span className='logoName'>Facebook <span>basic version</span></span>
          </div>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <input placeholder='Search for friend, post or video' className="searchInput" />
          <div className="searchIconContainer">
            <Search className='searchIcon'/>
          </div>
        </div>
      </div>

      <div className="topbarRight">
        {/* <div className='topbarLinks'>
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person sx={{fontSize: '30px'}}/>
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Message sx={{fontSize: '30px'}}/>
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <Notifications sx={{fontSize: '30px'}}/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <Link to={`/profile/${user._id}`}>
          <div className='accountWrapper'>
            <img 
            src={
              user.profilePicture 
              ? PF + user.profilePicture 
              : PF + "person/noAvatar.png"
            } 
            alt="" className="topbarImg"/>
            <div className="accountAction">
              <Link to={`/info/${user._id}`}>
                <Edit />
              </Link>
            </div>
            <div className="accountAction" onClick={handleLogout}>
              <Logout />
            </div>
          </div>
        </Link>

        {/* <Link to={`/info/${user._id}`}>
          <button>Edit Info</button>
        </Link>
        <button onClick={handleLogout}>Log out</button> */}
      </div>
    </div>
  )
}

import React, {useEffect, useState, useContext} from 'react'
import './rightbar.css'
import Online from '../online/Online';
import { Users } from "../../dummyData";
import axios from 'axios';
import { Link, useParams } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';

export const Rightbar = ({user}) => {
  const { id } = useParams()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([])
  const { user: currentUser, dispatch } = useContext(AuthContext)
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser, user?._id])
  // console.log(currentUser)

  useEffect(() => {
    const getFriends = async() =>{
      try{
        const friendList = await axios.get(`/users/friends/${user._id}`)
        setFriends(friendList.data)
      } catch(err) {
        // console.log(err)
      }
    } 
    getFriends();
  }, [user?._id])
  console.log(friends)

  const handleClick = async () => {
    try {
      if(followed){
        await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id})
        dispatch({type:"UNFOLLOW", payload:user._id})
      } else {
        await axios.put(`/users/${user._id}/follow`, {userId: currentUser._id})
        dispatch({type:"FOLLOW", payload:user._id})
      }
    } catch (err) {
      console.log(err)
    }
    setFollowed(!followed)
  }
  
  const HomeRightbar = () => {
    return(
      <>
        <div className="birthdayContainer">
          <img
          className="birthdayImg" 
          src={`${PF}gift.png`} 
          alt="" />
          <span className='birthdayText'>
            <b>Win</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <h4 className='rightbarTitle'>Advertisement</h4>
        <img 
        className='rightbarAd'
        src={`${PF}ad.jpg`} 
        alt="" />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map(f => (
            <Link 
            key={f._id}
            to={`/profile/${f._id}`}
            style={{ textDecoration: 'none' }}
            >
              <Online key={f._id} user={f} />
            </Link>
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return(
      <>
      {user.username !== currentUser.username && 
        <button className='rightbarFollowButton' onClick={handleClick}>
          {followed ? <ClearIcon /> : <AddIcon />}
          {followed ? "Unfollow" : "Follow"}
        </button>
      }
        <h4 className='rightbarTitle'>User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              { user.relationship === 1 ? 'Single' 
               :user.relationship === 2 ? 'Marriaged'
               :"Not updated yet" }
            </span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User friends</h4>
        <div className='rightbarFollowings'>
          {friends.map(friend => (
            <Link 
            key={friend._id}
            to={`/profile/${friend._id}`}
            style={{ textDecoration: 'none' }}
            >
              <div className='rightbarFollowing'>
                <img
                className='rightbarFollowingImg' 
                src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} 
                alt="" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {id ? <ProfileRightbar /> : <HomeRightbar />}
        {/* <ProfileRightbar /> */}
        {/* <HomeRightbar /> */}
      </div>
    </div>
  )
}
  


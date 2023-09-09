import React from "react"
import {useEffect, useContext} from "react"
import "./post.css"
import {MoreVert, Close, Save, Delete} from "@mui/icons-material"
// import {user} from "../../dummyData"
import { useState } from "react"
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Post({post}) {
  // console.log(user.filter(u => u.id === post.userId)[0].profilePicture)
  // console.log(post.desc)
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState ({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const {user: currentUser} = useContext(AuthContext)
  const [menuOn, setMenuOn] = useState(false)

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes])
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`)
      // console.log(res)
      setUser(res.data)
    }
    fetchUser()
  }, [post.userId])

  const likeHandler = () => {
    try{
      axios.put(`/posts/${post._id}/like`, {userId:currentUser._id})
    } catch (err){

    }
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  const handleDelete = async () => {
    console.log(post._id, currentUser._id)
    try{
      // https://masteringjs.io/tutorials/axios/delete
      const res = await axios.delete(`/posts/${post._id}`, {data: {userId:currentUser._id}})
      window.location.reload()
    } catch (err){
      console.log(err)
    }
  }


  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link 
            to={`profile/${user._id}`} >
              <img 
              src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} 
              alt="" 
              className="postProfileImg" />
            </Link>
            
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">• {format(post.createdAt)}</span>
          </div>
          <div className="postTopRight" onClick={() => setMenuOn(prev => !prev)}>
            <MoreVert />
          </div>

          {/* {post.userId === currentUser._id && <button onClick={handleDelete}>Delete</button>} */}
          {menuOn &&
            <div className="postMenu">
              {post.userId === currentUser._id &&
                <div className="postMenuItem" onClick={handleDelete}>
                  <span>Delete</span>
                  <Delete sx={{color: '#FF5858'}}/>
                </div>
              }
              <div className="postMenuItem">
                <span>Save</span>
                <Save sx={{color: '#00ABB3'}}/>
              </div>
            </div>
          }
        </div>

        <div className="postCenter">
          {post.desc && <div className="postText">{post.desc}</div>}
          {post.img && <img src={PF+post.img} alt="" className="postImg" />}
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likeHandler}/>
            <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likeHandler}/>
            <span className="postLikeCounter">{like} people like this post</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
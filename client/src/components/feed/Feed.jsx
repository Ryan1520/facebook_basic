import React from "react";
import {useState, useEffect, useContext} from "react"
import './feed.css';
// import {Posts} from "../../dummyData"
import Share from "../share/Share";
import Post from "../post/Post";
import Story from "../story/Story";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";

export const Feed = ({id}) => {
  const [posts, setPosts] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = id 
      ? await axios.get("/posts/profile/" + id)
      : await axios.get("/posts/timeline/" + user._id)
      // console.log(res)
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
      )
    }
    fetchPosts()
  }, [id, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* <Story /> */}
        {(id === user._id || !id) && <Share />}
      
        {posts.map(p => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

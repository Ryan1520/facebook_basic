import React, {useContext, useRef, useState} from 'react'
import {PermMedia,Room, EmojiEmotions, LocalOffer, Send} from "@mui/icons-material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './share.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Share(){
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const {user} = useContext(AuthContext)
  const desc = useRef()
  const [file, setFile] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      newPost.img = fileName;
      try {
        // console.log(newPost);
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err)
      }
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="" className="shareProfileImg" />
          <input 
          type="text" 
          className="shareInput" 
          ref = {desc}
          placeholder={"What do you think, " + user.username + "!"}/>
        </div>

        <hr className='shareHr'/>

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <HighlightOffIcon className="shareCancelImg" onClick={() => setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia className="shareIcon" htmlColor='tomato'/>
              <span className="shareOptionText">Photo or Video</span>
              <input 
              style={{display: "none"}}
              type="file" 
              id="file" 
              accept=".png, .jpeg, .jpg" 
              onChange={(e) => setFile(e.target.files[0])}/>
            </label>

            <div className="shareOption">
              <LocalOffer className="shareIcon" htmlColor='blue'/>
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
              <Room className="shareIcon" htmlColor='green'/>
              <span className="shareOptionText">Location</span>
            </div>

            <div className="shareOption">
              <EmojiEmotions className="shareIcon" htmlColor='goldenrod'/>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share <Send /> </button>
        </form>
      </div>
    </div>
  )
}



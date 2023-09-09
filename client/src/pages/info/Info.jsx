import React from 'react'
import './info.css'
import {useState, useEffect} from "react"
import axios from "axios"
import {useParams, useHistory} from "react-router-dom"
import { Topbar } from '../../components/topbar/Topbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import {AddPhotoAlternate, Done} from "@mui/icons-material"

export const Info = () => {
  const id = useParams().id
  const [user, setUser] = useState ({})
  const [input, setInput] = useState({})
  const [avaFile, setAvaFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const history = useHistory()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${id}`)
      // console.log(res)
      setUser(res.data)
      setInput(res.data)
      localStorage.setItem('user', JSON.stringify(res.data));
    }
    fetchUser()
  }, [id])
  // console.log(user);

  const handleInput = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }
  // console.log(input);


  const handleSubmit = async (e) => {
    e.preventDefault()
    const editInfo = {...input}

    if(avaFile){
      const data = new FormData();
      const avaName = Date.now() + avaFile.name;
      data.append("name", avaName);
      data.append("file", avaFile);

      editInfo.profilePicture = avaName
      try {
        // console.log(newPost);
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    if(coverFile){
      const data = new FormData();
      const coverName = Date.now() + coverFile.name;
      data.append("name", coverName);
      data.append("file", coverFile);

      editInfo.coverPicture = coverName
      try {
        // console.log(newPost);
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    
    try {
      const res = await axios.put(`/users/${user._id}`, editInfo);
      window.location.reload();
      // history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  

  return (
    <div className='info-container'>
      <Topbar />
      <div className='info'>
        <Sidebar />
        <div className='infoWrapper'>
          <div className='currentInfo'>
            <div className='avaContainer'>
              <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="avatar" />
            </div>
            <h2>{user.username}</h2>
            <div className='textContainer'>
              <h3>Email: {user.email}</h3>
              <h4>Followers: {user.followers?.length}</h4>
              <h4>Followings: {user.followings?.length}</h4>
            </div>
          </div>
          <form className='editForm' onSubmit={handleSubmit}>
            <h1>Edit Your Profile</h1>
            <div className='editSection'>
              <label htmlFor="emailEdit">Email</label>
              <input type="text" name="email" id="emailEdit" value={input.email} onChange={handleInput}/>
            </div>
            <div className='editSection'>
              <label htmlFor="nameEdit">Username</label>
              <input type="text" name="username" id="nameEdit" value={input.username} onChange={handleInput}/>
            </div>
            <div className='editSection'>
              <label htmlFor="avaEdit">Avatar</label>
              <label htmlFor="avaEdit" className='file-input'>
                {avaFile === null
                  ? ( <>
                      <AddPhotoAlternate sx={{marginRight: '10px', fontSize: '30px'}}/>
                      <span>Select your photo</span>
                      </>
                    )
                  : ( <>
                      <Done sx={{marginRight: '10px', fontSize: '30px'}}/>
                      <span>Selected</span>
                      </>
                    )  
                }
                <input 
                type="file" 
                name="profilePicture" 
                id="avaEdit" 
                accept=".png, .jpeg, .jpg" 
                onChange={(e) => setAvaFile(e.target.files[0])}/>
              </label>
            </div>
            <div className='editSection'>
              <label htmlFor="coverEdit">Cover Image</label>
              <label htmlFor="coverEdit" className='file-input'>
                {coverFile === null
                  ? ( <>
                      <AddPhotoAlternate sx={{marginRight: '10px', fontSize: '30px'}}/>
                      <span>Select your photo</span>
                      </>
                    )
                  : ( <>
                      <Done sx={{marginRight: '10px', fontSize: '30px'}}/>
                      <span>Selected</span>
                      </>
                    )  
                }
                <input 
                type="file" 
                name="coverPicture" 
                id="coverEdit" 
                accept=".png, .jpeg, .jpg" 
                onChange={(e) => setCoverFile(e.target.files[0])}/>
              </label>
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}


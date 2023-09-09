import "./profile.css"
import {Topbar} from "../../components/topbar/Topbar";
import {Sidebar} from "../../components/sidebar/Sidebar";
import {Feed} from "../../components/feed/Feed";
import {Rightbar} from "../../components/rightbar/Rightbar";
import {useState, useEffect} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"

export function Profile() { 
  const [user, setUser] = useState ({})
  const id = useParams().id

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${id}`)
      // console.log(res)
      setUser(res.data)
    }
    fetchUser()
  }, [id])

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img 
              className="profileCoverImg" 
              src={user.coverPicture ? PF+user.coverPicture : PF + "person/noCover.jpg"} 
              alt="" />
              <img
              className="profileUserImg"
              src={user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.png"}
              alt = "" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed id={id}/>
            <Rightbar user={user}/> 
          </div>
        </div>
      </div>
    </>
  )
}

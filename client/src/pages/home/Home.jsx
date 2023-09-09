import React, {useContext} from 'react'
import { Topbar } from '../../components/topbar/Topbar'
import { Feed } from '../../components/feed/Feed'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Rightbar } from '../../components/rightbar/Rightbar'
import './home.css'
import { AuthContext } from "../../context/AuthContext";


export const Home = () => {
  const {user}  = useContext(AuthContext)
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar user={user} />
      </div>
    </div>
  )
}

import './online.css';

export default function Online({user}){
  // console.log(user.profilePicture)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return(
    <li className='rightbarFriend'>
      <div className='rightbarProfileImgContainer'>
        <img src={PF+user.profilePicture} alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className='rightbarUsername'>{user.username}</span>    
    </li>
  )
}
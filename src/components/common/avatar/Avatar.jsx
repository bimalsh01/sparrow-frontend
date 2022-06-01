import React from 'react'
import { useSelector } from 'react-redux'
import "././Avatar.css"

const Avatar = ({width}) => {
    const auth = useSelector(state => state.Auth)
    // const {profile} = useSelector(state => state.Auth.user)
  return (
    <>
        <div>
          {
            auth.isAuth ? <img width={width} className="profileImgg" src={auth.user.profile} alt="Profile pic"  /> : <div></div>
          }
        </div>
    </>
  )
}

export default Avatar
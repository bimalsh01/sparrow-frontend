import React from 'react'
import { useSelector } from 'react-redux'
import "././Avatar.css"

const Avatar = ({width}) => {
    const {profile} = useSelector(state => state.Auth.user)
  return (
    <>
        <div>
          <img width={width} className="profileImgg" src={profile} alt="Profile pic"  />
        </div>
    </>
  )
}

export default Avatar
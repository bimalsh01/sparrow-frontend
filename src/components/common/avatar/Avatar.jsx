import React from 'react'
import "././Avatar.css"

const Avatar = ({width}) => {
    console.log(width);
  return (
    <>
        <div>
          <img width={width} className="profileImgg" src="/images/user.jpg" alt="Profile pic"  />
        </div>
    </>
  )
}

export default Avatar
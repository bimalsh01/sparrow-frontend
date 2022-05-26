import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <>
        <div className="mainContent">
            <h1 className='display-1'>Welcome</h1>
            <Link to={"/login"}>
                <h5>Click here to login</h5>
            </Link>
        </div>
    </>
  )
}

export default Main
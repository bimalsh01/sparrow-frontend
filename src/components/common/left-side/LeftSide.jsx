import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './LeftSide.css';

const LeftSide = () => {
  const {fname,lname,username} = useSelector(state => state.Auth.user);
  const {isAuth} = useSelector(state => state.Auth);

  return (
    <>
        <Link to={"/profile"}>
            <div className="mainProfile">
              <img className="profile_img" src="/images/user.jpg" alt="Profile pic" width="35%" />
              <div className="name">
                <h5>{fname} {lname}</h5>
                <span class="badge bg-primary">@{username}</span>
              </div>
            </div>
          </Link>
          <div className="mt-4 flex-column">

            <h5><i class="fa-solid me-2 fs-4 fa-house-circle-check"></i>Homepage</h5>
            <Link to={'/message'}>
            <h5><i class="fa-solid mt-3 me-2 fs-4 fa-comments"></i>Messages</h5>
            </Link>

            <h5><i class="fa-solid mt-3 me-2 fs-4 fa-circle-question"></i>Unanswered</h5>
            <h5><i class="fa-solid mt-3 me-2 fs-4 fa-house-circle-check"></i>Homepage</h5>
          </div>

          <div className="spaceSection">

          </div>
    </>
  )
}

export default LeftSide
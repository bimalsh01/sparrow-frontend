import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './LeftSide.css';

const LeftSide = () => {
  const {fname,lname,username} = useSelector(state => state.Auth.user);
  const {profile} = useSelector(state => state.Auth.user);

  return (
    <>
        <Link to={"/profile"}>
            <div className="mainProfile">
              <img className="profile_img" src={profile} alt="Profile pic" width="35%" />
              <div className="name">
                <h5>{fname} {lname}</h5>
                <span class="badge bg-primary">@{username}</span>
              </div>
            </div>
          </Link>
          <div className="mt-4 flex-column">

            <h5 className='fw-bold mb-3'><img className='me-1' src="/images/home.png" alt="" width={"15%"} />Homepage</h5>
            <Link to={'/message'}>
            <h5 className='fw-bold ms-1 mb-3'><img className='me-1' src="/images/mail.png" alt="" width={"12%"} /> Messages</h5>
            </Link>

            <h5 className='fw-bold ms-1 mb-3'><img className='me-2' src="/images/qsns.png" alt="" width={"12%"} />Unanswered</h5>
            <h5 className='fw-bold ms-1'><img className='me-2' src="/images/bookmark.png" alt="" width={"13%"} />Homepage</h5>
          </div>

          <div className="spaceSection">

          </div>
    </>
  )
}

export default LeftSide
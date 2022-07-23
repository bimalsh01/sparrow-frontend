import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllRooms } from '../../../http/Index';
import './LeftSide.css';

const LeftSide = () => {
  const { fname, lname, username } = useSelector(state => state.Auth.user);
  const { profile } = useSelector(state => state.Auth.user);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

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

        <Link to={'/dashboard'}>
          <h5 className=' fw-bold mb-3'><img className='me-1' src="/images/home.png" alt="" width={"12%"} />Homepage</h5>

        </Link>

        <Link to={'/message'}>
          <h5 className='ms-1 fw-bold mb-3'><img className='me-1' src="/images/mail.png" alt="" width={"10%"} /> Messages</h5>
        </Link>

        <Link to={'/search'}>
          <h5 className='ms-1 mb-3 fw-bold'><img className='me-2' src="/images/qsns.png" alt="" width={"10%"} />Search</h5>
        </Link>
        <Link to={'/favourite'}>
          <h5 className='ms-1 fw-bold'><img className='me-2' src="/images/bookmark.png" alt="" width={"11%"} />Favourite</h5>
        </Link>

        <Link to={'/room'}>
          <h5 className='ms-1 mt-3 fw-bold'><img className='me-2' src="/images/room.png" alt="" width={"11%"} />Voice Rooms</h5>
        </Link>
      </div>

      <div className="spaceSection">
        <h6 className='text-center fw-bold pt-2'>Trending rooms 🎉 </h6>
        <hr />




        {
          rooms.map((room) => {
            return (
              <>
                <Link to={`/room/${room.id}`}>
                  <div className="d-flex mt-2 mb-2">
                    <div className='ms-2 me-2 mt-1'>
                      <img className='bdr-50' src="/images/wave.png" alt="" width={"120%"} />
                    </div>
                    <div className='ps-2 pe-2'>
                      <p>{room.topic}</p>
                      {/* <p> <strong>Hosted by #Bimal{room.speaker}</strong> </p> */}
                    </div>
                  </div>
                </Link>
                <hr />
              </>
            )
          })


        }










      </div>
    </>
  )
}

export default LeftSide
import React, { useState, useEffect } from 'react'
import { createConversation, getAllUsers } from '../../../http/Index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Space = () => {

  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const {id} = useSelector(state => state.Auth.user);

  // get all users useEffect
  useEffect(() => {
    getAllUsers().then(res => {
      setData(res.data);
    })
  })

  console.log(currentUser, "cbdf");

  // create conversations
  const createChat = (user) => {
    createConversation({senderId: id, receiverId: currentUser._id}).then(res => {
      console.log(res);
    });
  }

  return (
    <>
      <div className="d-flex p-3 justify-content-between">
        <p className='text-center fs-6'>Suggested for you</p>
        <p><i class="fa-brands fa-forumbee"></i></p>
      </div>
      <hr />

      {
        data.map(data => {
          return (
            <>
              
              <div className='d-flex p-3'>
                <img className='bdr-50' src="/images/user.png" alt="" width={"18%"} />
                <div className='ms-3'>
                  <div className="d-flex justify-content-between">
                    <p className='me-3 fw-bold'>{data.fname} {data.lname}</p>
                    <a className='text-light ' href="#">{data.followers.length} Followers</a>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>@{data.username}</p>
                    {/* <Link to={`/message/${data._id}`}> */}
                    {/* <button onClick={() => setCurrentUser(data)} className=' hidden btn text-white ms-2 ps-2 fw-bold pe-2 p-0'>set</button> */}
                    <button  onClick={createChat} className='btn text-white ms-2 ps-2 fw-bold pe-2 p-0'>Profile</button>

                    {/* </Link> */}
                  </div>
                </div>

              </div>
          
              <hr />
            </>

          )
        })
      }






    </>
  )
}

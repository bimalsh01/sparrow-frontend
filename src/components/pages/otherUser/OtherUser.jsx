import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import { createConversation, follow, getAllQuestionsByUser, getUser, unfollow } from '../../../http/Index';
import { format } from 'timeago.js'

const OtherUser = () => {
    const { id: _id } = useParams();
    let [data, setData] = useState([]);
    const [user, setUser] = useState('');
    const [followerslength, setfollowerslength] = useState(null);
    const [followinglength, setfollowinglength] = useState(null);
    const [followed, setFollowed] = useState(false);

    const { id } = useSelector(state => state.Auth.user);

    const navigate = useNavigate();


    useEffect(() => {
        getAllQuestionsByUser(_id).then(res => {
            setData(res.data.data);
        })
        getUser(_id).then(res => {
            setUser(res.data.data[0]);
            console.log(res.data.data[0], "user");
            localStorage.setItem('followers', JSON.stringify(res.data.data[0].followers));
            setfollowerslength(res.data.data[0].followers.length);
            setfollowinglength(res.data.data[0].followings.length);
        })

    }, [followerslength, followinglength, followed])



    useEffect(() => {
        // check in local storage if user is in array of followers
        let followers = JSON.parse(localStorage.getItem('followers'));

        if (followers.includes(id)) {
            setFollowed(true);
        }

    }, [id])


    function followUser() {
        console.log("following",_id);
        follow({ followId: _id, userId:id }).then(res => {
            console.log(res.data);
            setFollowed(true);
        })
    }
    function unfollowUser() {
        unfollow({ followId: _id, userId:id }).then(res => {
            setFollowed(false);

        })
    }

    console.log(id, "id");

    const createChat = (user) => {
        createConversation({ senderId: id, receiverId: _id }).then(res => {
            console.log("Got it", res);
        });
        
        navigate('/message');
        
    }
 



    return (
        <>
            <div className='container'>
                <div className="d-flex justify-content-between">
                    <div className="mainSetting">
                        <div>
                            <img className="profileImg" src={user.profile} alt="Profile pic" />
                        </div>
                        <div className="name">
                            <h2>{user.fname} {user.lname}</h2>
                            <div className='d-flex ms'>
                                <span class="badge bg-primary">@{user.username}</span>
                                {
                                    // if current user followed the other user then show unfollow button

                                    followed ?
                                        <button onClick={unfollowUser} className='btn btn-outline-white ms-2 ps-2 fw-bold pe-2 p-0'>unfollow</button>
                                        :
                                        <button onClick={followUser} className='btn btn-outline-white ms-2 ps-2 fw-bold pe-2 p-0'>Follow</button>


                                }
                                <button onClick={createChat} className='btn btn-outline-white ms-2 ps-2 fw-bold pe-2 p-0'>Message</button>

                            </div>


                            <div className='mt-2 d-flex '>
                                <p>{followerslength ?? '0'} Followers</p>
                                <p className='ms-3'>{followinglength ?? '0'} Following</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='mt-5 '>
                    <h4 className='fw-bold'>Question asked by this user</h4>
                    <hr className='mt-2' />
                    <div className="scroller">

                        <div className="scroller">
                            {
                                data.map(item => {
                                    return (
                                        <div>

                                            <Link to={`/qnapage/${item._id}`}>
                                                <p className='mt-3'>{item.questionName}</p>
                                            </Link>
                                            <p className='fw-bold'>Asken on {format(item.createdAt)}</p>
                                            <hr className='mt-2' />
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>


                </div>



            </div>
        </>
    )
}

export default OtherUser
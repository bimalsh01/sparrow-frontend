import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { follow, getAllQuestionsByUser, getUser, unfollow } from '../../../http/Index';

const OtherUser = () => {
    const { id: _id } = useParams();
    let [data, setData] = useState([]);
    const [user, setUser] = useState('');
    const [followerslength,setfollowerslength] = useState(null);
    const [followinglength,setfollowinglength] = useState(null);
    const [followed,setFollowed] = useState(false);

    const {id} = useSelector(state => state.Auth.user);
    

    useEffect(() => {
        getAllQuestionsByUser(_id).then(res => {
            setData(res.data);
        })
        getUser(_id).then(res => {
            setUser(res.data.user);
            console.log(res.data.user, "user");
            localStorage.setItem('followers', JSON.stringify(res.data.user.followers));
            setfollowerslength(res.data.user.followers.length);
            setfollowinglength(res.data.user.followings.length);
        })

    }, [followerslength,followinglength,followed])

    useEffect(() => {
        // check in local storage if user is in array of followers
        let followers = JSON.parse(localStorage.getItem('followers'));
        
        if (followers.includes(id)) {
            setFollowed(true);
        }

    },[id])


    function followUser() {
        follow({followId:_id}).then(res => {
            console.log(res.data);
            setFollowed(true);
        })
    }
    function unfollowUser() {
        unfollow({followId:_id}).then(res => {
            setFollowed(false);
            
        })
    }

    
    return (
        <>
            <div className='container'>
                <div className="d-flex justify-content-between">
                    <div className="mainSetting">
                        <div>
                            <img className="profileImg" src="/images/user.png" alt="Profile pic" />
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
                                            <p className='fw-bold'>Asken on {item.createdAt}</p>
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
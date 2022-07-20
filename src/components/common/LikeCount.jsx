import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { like, unlike } from '../../http/Index';

const LikeCount = ({data}) => {

    const likePost = (id) => {
        setlikeLength(likeLength+1)
        setIsLiked(true)
        like({questionId:id}).then(res => {
            console.log(res, "like response");
        })
    }

    const unlikePost = (id) => {
        setlikeLength(likeLength-1)
            setIsLiked(false)
        unlike({questionId:id}).then(res => {
            console.log(res, "like response");
        })
    }

    // useselector from redux
    const {id} = useSelector(state => state.Auth.user)

    useEffect(() => {
        data.likes.map (data => {
            if (data === id) {
               setIsLiked(true)
            }
        })
    })

    

    const [likeLength, setlikeLength] = useState(data.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    // const isLiked  = true;

  return (
    <>
        {
                
                isLiked ? <button className='btn ms-2 btn-outline-light' onClick={() => unlikePost(data._id)}>{likeLength} <i class="fa-solid fa-heart"></i></button>
                : <button className='btn ms-2 btn-outline-light' onClick={() => likePost(data._id)}>{likeLength} <i class="fa-regular fa-heart"></i></button>
        }
    </>
  )
}

export default LikeCount
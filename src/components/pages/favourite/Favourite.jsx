import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllFavourite } from '../../../http/Index'
import LeftSide from '../../common/left-side/LeftSide'
import Sidebar from '../../common/sidebar/Sidebar'
import './Favourite.css'

const Favourite = () => {

    const { id } = useSelector(state => state.Auth.user)

    // data
    const [data, setData] = useState([])


    // useeffect to get all favourite questions
    useEffect(() => {
        getAllFavourite(id).then(res => {
            setData(res.data)
            console.log(res.data, "favourite questions");
        })
    }, [])

    // remove favourite question
    const removeFavourite = (id) => {
        console.log(id, "this is id");
        const newData = data.filter(item => item._id !== id)
        setData(newData)
    }

    return (
        <>

            <div class="main-section container">
                <div class="left-side">
                    <LeftSide />
                </div>
                <div className='middle-side'>
                    <h4 className='ms-2 mt-2'>Your saved post</h4>
                    <div class="row row-cols-md-3">

                        {
                            data.map(item => {
                                return (
                                    <div class="col">
                                        <div className="favcard">
                                            <img src={item.questionId.questionImage} class="card-img-top" alt="Hollywood Sign on The Hill" />
                                            <div class="card-body">
                                                {/* <h5 class="card-title">Posted by, {item.fname}</h5> */}
                                                <p class="card-text">
                                                    {
                                                        item.questionId.questionName
                                                    }
                                                </p>
                                            </div>

                                            <button  onClick={() => {removeFavourite(item._id)}} className='btn text-white w-100' >
                                                Remove
                                            </button>

                                        </div>
                                    </div>
                                )
                            })
                        }




                    </div>
                </div>
            </div>

        </>
    )
}

export default Favourite
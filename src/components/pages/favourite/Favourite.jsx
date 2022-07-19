import React from 'react'
import LeftSide from '../../common/left-side/LeftSide'
import Sidebar from '../../common/sidebar/Sidebar'
import './Favourite.css'

const Favourite = () => {
    return (
        <>

            <div class="main-section container">
                <div class="left-side">
                    <LeftSide />
                </div>
                <div className='middle-side'>
                    <h4 className='ms-2 mt-2'>Your saved post</h4>
                    <div class="row row-cols-md-3">
                        <div class="col">
                            <div className="favcard">
                                <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top" alt="Hollywood Sign on The Hill" />
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">
                                        This is a longer card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div class="col">
                            <div className="favcard">
                                <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top" alt="Hollywood Sign on The Hill" />
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">
                                        This is a longer card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div className="favcard">
                                <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top" alt="Hollywood Sign on The Hill" />
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">
                                        This is a longer card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default Favourite
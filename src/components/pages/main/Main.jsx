import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <>
      {/* <div className="mainContent">
            <h1 className='display-1'>Welcome</h1>
            <Link to={"/login"}>
                <h5>Click here to login</h5>
            </Link>
        </div> */}
      <div className='container'>
      <header>
        <div class=" d-flex justify-content-center align-items-center text-center h-100">
          <div class="text-white">
            <h1 class="mb-1 mt-6 display-1 fw-bold">Sparrow Network</h1>
            <p class="mb-3">complete question and answer bank for every curious mind</p>

            <div className="row">
              <div className="col-md-4 align-items-center mt-3 d-flex justify-content-between">
                <img className='ms-5' src="/images/b2.png" width={"47%"} alt="" />
                <img className='ms-5' src="/images/b1.png" width={"47%"} alt="" />
                <img className='ms-5' src="/images/b5.png" width={"47%"} alt="" />
                <img className='ms-5' src="/images/b4.png" width={"47%"} alt="" />
                <img className='ms-5' src="/images/b3.png" width={"47%"} alt="" />
              </div>
            </div>



            <Link to={"/login"}>
              <button className="btn btn-outline-light btn-lg mt-5">
                DESIGNED AND DEVELOPED BY BIMAL SHRESTHA _ GITHUB @ITSBIMAL
              </button>
            </Link>
          </div>
        </div>
      </header>
      </div>
    </>
  )
}

export default Main
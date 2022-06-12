import React from 'react'
import LeftSide from '../../common/left-side/LeftSide'
import { Space } from '../space/Space'

const SearchResult = () => {
  return (
    <>
      <div class="main-section container">
        <div class="left-side">
          <LeftSide />
        </div>
        <div class="middle-side">
          <div className="contents">
            <h5> Search results for 'hello'</h5>
            <hr />
            {/* display all the questions */}
            <div className="ms-1 mt-2">
              <div className='questionCard'>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dignissimos soluta voluptates dolore tempore aliquid saepe aperiam, quisquam quaerat nesciunt doloremque quod explicabo porro sint, beatae reiciendis! Perspiciatis, perferendis? Corporis?
                </p>
                <h6 className='mt-2 fw-bold'>
                  Asked by <u>John Doe</u> on <u>12/12/2019</u>
                </h6>
              </div>
              
            </div>
            <div className="ms-1 mt-2">
              <div className='questionCard'>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dignissimos soluta voluptates dolore tempore aliquid saepe aperiam, quisquam quaerat nesciunt doloremque quod explicabo porro sint, beatae reiciendis! Perspiciatis, perferendis? Corporis?
                </p>
                <h6 className='mt-2 fw-bold'>
                  Asked by <u>John Doe</u> on <u>12/12/2019</u>
                </h6>
              </div>
              
            </div>
            <div className="ms-1 mt-2">
              <div className='questionCard'>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dignissimos soluta voluptates dolore tempore aliquid saepe aperiam, quisquam quaerat nesciunt doloremque quod explicabo porro sint, beatae reiciendis! Perspiciatis, perferendis? Corporis?
                </p>
                <h6 className='mt-2 fw-bold'>
                  Asked by <u>John Doe</u> on <u>12/12/2019</u>
                </h6>
              </div>
              
            </div>

            <div className="ms-1 mt-2">
              <div className='questionCard'>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dignissimos soluta voluptates dolore tempore aliquid saepe aperiam, quisquam quaerat nesciunt doloremque quod explicabo porro sint, beatae reiciendis! Perspiciatis, perferendis? Corporis?
                </p>
                <h6 className='mt-2 fw-bold'>
                  Asked by <u>John Doe</u> on <u>12/12/2019</u>
                </h6>
              </div>
              
            </div>
            


          </div>
        </div>
        <div className="right-side">
          <Space />
        </div>
      </div>
    </>
  )
}

export default SearchResult
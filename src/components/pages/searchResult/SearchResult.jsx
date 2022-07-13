import React, { useState } from 'react'
import { QsnSearch } from '../../../http/Index';
import LeftSide from '../../common/left-side/LeftSide'
import { Space } from '../space/Space'
import { Link } from 'react-router-dom';

const SearchResult = () => {
  const [search, setSearch] = useState('');
  const [qsn, setQsn] = useState('');
  console.log(qsn);

  const handleSearch = async (e) => {
    QsnSearch({ questionName: search }).then(res => setQsn(res.data.data))
  }
  return (
    <>
      <div class="main-section container">
        <div class="left-side">
          <LeftSide />
        </div>
        <div class="middle-side">
          <div className="contents">

            <div className="search">
              <i class=" fa-solid fs-5 fa-magnifying-glass"></i>
              <form action="" onChange={handleSearch}>
                <input
                  onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
                  type="text"
                  placeholder="Search any questions ..."
                  className="searchInput"
                />
              </form>
            </div>
            {
              qsn == "" ? null :
              <p className='m-2'>Search result for '{search}'</p>
            }


            <hr />
           

            {
              qsn == "" ? null :
                <div>
                  {
                    qsn.map(qsn => (
                      <div className="ms-1 mt-2">

                      
                      <div className='questionCard'>
                        <Link to={`/qnapage/${qsn._id}}`}>
                        <p>
                          {qsn.questionName}
                        </p>
                        </Link>
                        <h6 className='mt-2 fw-bold'>
                          Asked by {qsn.postedBy.fname} on {qsn.createdAt}
                        </h6>
                      </div>
                      </div>
                    ))

                  }
                </div>
            }



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
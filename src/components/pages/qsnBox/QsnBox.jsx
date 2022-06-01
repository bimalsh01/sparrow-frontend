import React from 'react'
import Avatar from '../../common/avatar/Avatar'

const QsnBox = () => {
    return (
        <div class="ArticleCard card">
            <div className="head d-flex">
                <Avatar width={'42px'}/>
                {/* <input placeholder='What are you curious about?' className='searchSection askQsn w-100 ms-2 p-2' type="text" name="" id="" /> */}
                <button className='searchSection askQsn w-100 ms-2 ps-3'>What are you curious about?</button>
            </div>

        </div>
    )
}

export default QsnBox
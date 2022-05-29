import React from 'react'

const QsnBox = () => {
    return (
        <div class="ArticleCard card">
            <div className="head d-flex">
                <img src="/images/user.png" width={"7%"} alt="" />
                {/* <input placeholder='What are you curious about?' className='searchSection askQsn w-100 ms-2 p-2' type="text" name="" id="" /> */}
                <button className='searchSection askQsn w-100 ms-2 ps-3'>What are you curious about?</button>
            </div>

        </div>
    )
}

export default QsnBox
import { React, useState, useEffect } from 'react'
import Avatar from '../../common/avatar/Avatar'
import QsnBox from '../qsnBox/QsnBox'
import "./Article.css";
import Modal from 'react-responsive-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getQuestions, like, unlike } from '../../../http/Index';
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'html-react-parser';

const Article = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([])
    

    useEffect(() => {
        getQuestions().then(res => {
            setData(res.data.data)
            console.log(res.data.data, "data")
        })
    }, [])

    const likePost = (id) => {
        console.log(id, "like post id");
        like({questionId:id}).then(res => {
            console.log(res, "like response");
        })
    }

    const unlikePost = (id) => {
        unlike(id).then(res => {
            console.log(res, "like response");
        })
    }

    return (
        <>
            <QsnBox />
            <h5 className='mt-3 mb-3 fw-bold'><u>Recent Questions</u></h5>

            {
                data.map(data => {
                    return (
                        <div className='ArticleCard mb-3'>
                            <div className="post__info">
                                <img className='profileImgg' src={data.postedBy.profile} alt="profile" width={"40px"} />
                                <h5 className='mt-1'>@{data.postedBy.username}</h5>
                                <small>posted on {data.createdAt}</small>
                            </div>
                            <div className="post__body justify-content-between">
                                <Link to={`/qnapage/${data._id}`}>
                                    <h5>{data.questionName}</h5>
                                </Link>
                            </div>
                            <hr />
                            {data.answers.slice(0, 1).map(answerData => {
                                return (
                                    <div className="post__answer">
                                        <h6 className='fw-bold mt-2'>Answered by <u><a href="#"> {answerData.answeredBy} </a></u>on {answerData.answeredOn} </h6>
                                        {answerData.text == "" ?
                                            <p>No answer yet</p>
                                            :
                                            <p>{ReactHtmlParser(answerData.text)}</p>
                                        }
                                    </div>
                                )
                            })}
                            {
                                data.questionImage ? <img className='qnaImage' src={data.questionImage} alt="" width={"100%"} /> : <div></div>
                            }

                            <div className="post__footer d-flex justify-content-between mt-3">
                                <div className="post_footerAction">
                                    <button onClick={() => {likePost(data._id)}} type="button" class="btn btn-outline-light" data-mdb-ripple-color="dark">{data.likes.length} <i class="fa-solid fa-thumbs-up"></i></button>
                                    <Link to={`/qnapage/${data._id}`}>
                                        <button type="button" class="btn ms-2 btn-outline-light" data-mdb-ripple-color="dark">Add Answer</button>
                                    </Link>
                                    <button type="button" class="btn ms-2" data-mdb-ripple-color="dark"><i class="fa-solid fa-share"></i></button>
                                </div>
                                <div className="rightSide">
                                    <button type="button" class="btn ms-2 fs-6 shadow-0" data-mdb-ripple-color="dark"><i class="fa-solid fa-bookmark"></i></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            {/* <Modal classNames={"answerModel"}
                center closeOnEsc open={isModalOpen}
            >
                <div className="modal__question">
                    <h4><b>This is test questions</b></h4>
                    <p>Asked by <u>Ashok Dorje</u> on <u>9th March 2022</u></p>
                </div>
                <hr />
                <div className="modal__answer">
                    <ReactQuill placeholder='Enter your thoughts' />
                </div>
                <div className="modal__buttons d-flex mt-3 justify-content-between">
                    <button onClick={() => setIsModalOpen(false)} className='btn btn-danger w-100'>Close</button>
                    <button className='btn btn-primary ms-1 w-100'>Add Answer</button>
                </div>
            </Modal> */}

        </>
    )
}

export default Article
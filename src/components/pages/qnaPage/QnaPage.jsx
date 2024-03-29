import { React, useEffect, useState } from 'react';
import LeftSide from "../../common/left-side/LeftSide";
import { Space } from "../space/Space";
import "./QnaPage.css";
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { getOneQuestion, postAnswer } from '../../../http/Index';
import { useDispatch, useSelector } from 'react-redux';
import { setQsn } from "../../../store/Slice"
import HTMLReactParser from 'html-react-parser';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { format } from 'timeago.js';
import { setSnackbar } from '../../../store/SnackBar';

const QnaPage = () => {
    const { id: _id } = useParams();
    const [answer, setAnswer] = useState('');
    let [data, setData] = useState([]);
    const dispatch = useDispatch();
    const qsn = useSelector(state => state.Auth.qsn);

    const [image, setImage] = useState("");

    const{fname} = useSelector(state => state.Auth.user)


    console.log(qsn, "qsn");


    useEffect(() => {
        try {
            getOneQuestion(_id).then(res => {
                console.log(res.data, "data")
                setData(res.data.question.answers)
                dispatch(setQsn(res.data.question))
            })

        } catch (error) {
            console.log(error, "here");
        }
    }, [])

    const handleQuill = (value) => {
        setAnswer(value);
    }

    console.log(data, "This is data");

    async function handleSubmit() {
        console.log(image, "answer");

        await postAnswer({ ansImage: image, questionId: _id, answer: answer, answeredByName: fname })
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === _id) {
                        return result
                    }
                    return item;
                })

                setData(newData);

                // setSnackbar(true);
      dispatch(setSnackbar(true, "success", "success", "Answer posted successfully"));
                

            }).catch(err => {
      dispatch(setSnackbar(true, "error", "error", "Error in posting answer"));

                console.log('This is error', err);
            })
    }
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            console.log(reader.result);
            setImage(reader.result);
            //   dispatch(setProfile(reader.result));
        }
    };


    return (
        <>

            <div class="main-section container">
                <div class="left-side">
                    <LeftSide />
                </div>
                <div class="middle-side">
                    <div className="contents">
                        <div className="modal__question">
                            <h5><b>{qsn.questionName}</b></h5>
                            <p>Asked by <strong><u>{qsn.postedBy.fname} {qsn.postedBy.lname}</u></strong> about {format(qsn.createdAt)}</p>
                        </div>

                        {
                            data.map(data => {
                                return (
                                    <div>
                                        <hr className='mt-3 mb-3' />
                                        <div className="answer d-flex align-items-center">
                                            <img className="profile_img mt-2" src="/images/user.png" alt="Profile pic" width="6%" />
                                            <div className='ms-2'>
                                                {/* <p>{data.answeredBy.fname} {data.answeredBy.lname}</p> */}
                                                <p className='mt-2'>Answered by {data.answeredBy.fname} {data.answeredBy.lname} about {format(data.answeredOn)}</p>
                                            </div>
                                        </div>
                                        <p className='mt-3'>
                                            {HTMLReactParser(data.text)}
                                        </p>
                                        {
                                            data.answerImage == "default"? <img className="qnaImage mt-1" src="/images/answer.jpg" alt="Answer" width={"100%"} /> : 
                                            <img className='qnaImage mt-1' src={data.answerImage} alt="" width={"100%"} />
                                        }

                                    </div>
                                )
                            })
                        }

                        <h4 className='fw-bold mt-3'>Add your answers</h4>
                        <ReactQuill theme="snow" className="editor text-white" onChange={handleQuill} placeholder='Enter your thoughts' />

                        <button className='btn mt-2'>

                            <label htmlFor="file"><i class="fa-solid fa-camera"></i> Pick a image 'if Any have any'</label>
                            <input id="file" className="imageInput"
                                multiple accept="image/*,video/*" onChange={captureImage} />

                        </button>

                        {

                        }

                        <button onClick={handleSubmit} className='w-100 btn btn-success mt-3 shadow-0'>Submit</button>
                    </div>
                </div>
                <div className="right-side">
                    <Space />
                </div>
            </div>
        </>
    )
}

export default QnaPage;
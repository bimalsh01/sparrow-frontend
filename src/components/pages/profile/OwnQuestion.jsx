import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteQuestion } from '../../../http/Index'
import { setSnackbar } from '../../../store/SnackBar'

const OwnQuestion = ({item}) => {
  const dispatch = useDispatch();

    // delete question
  const delQuestion = (id) => {
    deleteQuestion(id).then(res => {
    //   const newData = data.filter(item => item._id !== id);
    //   setData(newData)
      dispatch(setSnackbar(true, "success", "success", "Question has been deleted!"));
    }
    ).catch(err => {
      dispatch(setSnackbar(true, "error", "error", "Error"));
    }
    )
  }
  return (
    <div className='d-flex justify-content-between'>
    <div>
      {/* <Link to={`/qnapage/${item._id}`}>
        <p className='mt-3'>{item.questionName}</p>
      </Link> */}
      <p className='fw-bold'>Asken on {item.createdAt}</p>
    </div>
    <div>
      <div className="d-flex">
        <button data-mdb-toggle="modal" data-mdb-target="#exampleModal1" className='btn me-2 btn-success shadow-0'><i class="fa-solid fa-pen-to-square "></i></button>
        <button onClick={() => { delQuestion(item._id) }} className='btn btn-danger shadow-0'><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  </div>
  )
}

export default OwnQuestion
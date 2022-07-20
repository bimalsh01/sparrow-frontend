import React, { useState, useEffect } from 'react';
import './Profile.css'
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuestion, getAllFollow, getAllQuestionsByUser, getUser, updatePassword, updateProfile } from '../../../http/Index';
import { setSnackbar } from '../../../store/SnackBar';
import { Link } from 'react-router-dom';
import { setProfile } from '../../../store/Slice';
import { useRef } from 'react';


export const Profile = () => {
  const [followerslength, setfollowerslength] = useState(null);
  const [followinglength, setfollowinglength] = useState(null);
  const [imageValue, setImagesValue] = useState("")


  const { id, fname, secondaryEmail, lname, profile, username, followers, following, phone, address } = useSelector(state => state.Auth.user);
  const { profile_upload } = useSelector(state => state.Auth);

  const [toggleState, setToggleState] = React.useState(1);
  const [image, setImage] = useState("");
  let [data, setData] = useState([]);
  let [proFollowers, setProFollowers] = useState([]);
  let [proFollowings, setProFollowings] = useState([]);

  // for profile update
  const [firstname, setFirstname] = useState(fname);
  const [lastname, setLastname] = useState(lname);
  const [secemail, setSecemail] = useState(secondaryEmail);
  const [adstate, setAdstate] = useState('');
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  // for updating password
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const toggleTab = (index) => {
    setToggleState(index);
  }

  console.log(profile, "profile");


  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setProfile(reader.result));
    }
  };

  useEffect(() => {
    getAllQuestionsByUser(id).then(res => {
      console.log(res, "data");
      setData(res.data.data);
    })
  }, [])


  // get all followers and following
  useEffect(() => {
    getAllFollow(id).then(res => {
      setProFollowers(res.data.followers);
      setProFollowings(res.data.followings);
    })
  }, [])

  console.log(proFollowings, "proFollowers");

  useEffect(() => {
    getUser(id).then(res => {
      setfollowerslength(res.data.user.followers.length);
      setfollowinglength(res.data.user.followings.length);
    })
  }, [])


  async function UpdateInfo(e) {
    e.preventDefault();
    if (!id || !firstname || !lastname || !secemail || !adstate || !city) {
      dispatch(setSnackbar(true, "error", "error", "Please fill up all the fields!"));
      return;
    }
    try {
      const { data } = await updateProfile({ id: id, fname: firstname, lname: lastname, secondaryEmail: secemail, state: adstate, city: city, profile: profile_upload });
      dispatch(setSnackbar(true, "success", "success", "Updated"));

    } catch (error) {
      console.log(error);
    }
  }

  async function UpdatePassword(e) {
    e.preventDefault();
    if (!id || !oldpassword || !newpassword || !confirmpassword) {
      dispatch(setSnackbar(true, "error", "error", "Please fill up all the fields!"));
      return;
    }

    // check password and confirm password
    if (newpassword !== confirmpassword) {
      dispatch(setSnackbar(true, "error", "error", "Password and confirm password does not match!"));
      return;
    }

    try {
      const { data } = await updatePassword({ id: id, oldPassword: oldpassword, newPassword: newpassword });
      dispatch(setSnackbar(true, "success", "success", "Updated"));

    } catch (error) {
      dispatch(setSnackbar(true, "error", "error", "Password does not match!"));

    }
  }

  // delete question
  const delQuestion = (id) => {
    deleteQuestion(id).then(res => {
      const newData = data.filter(item => item._id !== id);
      setData(newData)
      dispatch(setSnackbar(true, "success", "success", "Question has been deleted!"));
    }
    ).catch(err => {
      dispatch(setSnackbar(true, "error", "error", "Error"));
    }
    )
  }

  const [qsn, setQsn] = useState({
    questionName: '',
    questionImage: '',
  });

  const ref = useRef(null)

  const editQsn = (currentQsn) => {
    console.log(currentQsn, "currentQsn");
    ref.current.click();
    setQsn({
      questionName: currentQsn.questionName,
      questionImage: currentQsn.questionImage,
    });
  }

  const handleChangeImages = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader.result, "Image result");

    reader.onloadend = function () {
      setImagesValue(reader.result);
    }
  }


  return (
    <div className='container'>
      <div className="d-flex justify-content-between">
        <div className="mainSetting">
          <div>
            <img className="profileImg" src={profile} alt="Profile pic" />
          </div>
          <div className="name">
            <h2>{fname} {lname}</h2>
            <span class="badge bg-primary">@{username}</span>

            <div className='mt-2 d-flex '>
              <p>{followerslength} Followers</p>
              <p className='ms-3'>{followinglength} Following</p>
            </div>
          </div>
        </div>
        <div className="badgeSummary mainSetting text-center">

          <div>
            <div className='d-flex align-items-center'>

              <img src="/images/badge.png" alt="" width={"30%"} />

              <div>

                <h5>Bronze tier</h5>
                <h1 className='badge bg-success'>{phone} | Verified</h1>

                {
                  data.length < 5 ? <h4>Exp. 10</h4> : <h4>Exp. 21</h4>
                }

              </div>

            </div>
          </div>
          <div className='d-flex align-items-center me-5'>
            <div className='me-4'>
              <img src="/images/qsn.png" alt="" width={"80%"} />
              <p>Questions</p>
              <h4 className='fw-bold'>{data.length}</h4>
            </div>
            <div>
              <img src="/images/ans.png" alt="" width={"100%"} />
              <p>Answers</p>
              <h4 className='fw-bold'>{data.length}</h4>
            </div>

          </div>

        </div>
      </div>

      <div className="clientSetting">

        <div className="tab">
          <div className={toggleState === 1 ? "tabs active" : "tabs"} onClick={() => toggleTab(1)}>
            <h5 className='me-5'>My Questions</h5>
          </div>
          <div className={toggleState === 2 ? "tabs active" : "tabs"} onClick={() => toggleTab(2)}>
            <h5 className='me-5'>General Settings</h5>
          </div>
          <div className={toggleState === 3 ? "tabs active" : "tabs"} onClick={() => toggleTab(3)}>
            <h5 className='me-5 tablinks'>Privacy and Passcode</h5>
          </div>
          <div className={toggleState === 4 ? "tabs active" : "tabs"} onClick={() => toggleTab(4)}>
            <h5 className='tablinks'>Followers / Following</h5>
          </div>
        </div>

        <div className="tab-contents">
          <div className={toggleState === 1 ? "tabcontent" : "content"}>
            <div className='mt-3 '>
              <h4 className='fw-bold'>Your questions</h4>

              <div className="scroller">
                {
                  data.map(item => {
                    return (
                      <div className='d-flex justify-content-between'>
                        <div>
                          <Link to={`/qnapage/${item._id}`}>
                            <p className='mt-3'>{item.questionName}</p>
                          </Link>
                          <p className='fw-bold'>Asked on {item.createdAt}</p>
                        </div>
                        <div>
                          <div className="d-flex">
                            <button onClick={() => { editQsn(item) }} className='btn me-2 btn-success shadow-0'><i class="fa-solid fa-pen-to-square "></i></button>
                            <button onClick={() => { delQuestion(item._id) }} className='btn btn-danger shadow-0'><i class="fa-solid fa-trash"></i></button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                <hr className='mt-2' />


              </div>
            </div>
          </div>
          <div className={toggleState === 2 ? "tabcontent" : "content"}>
            <h4 className='mt-4 fw-bold'>Update your information</h4>

            <div className="row mt-3">
              <div className="col">
                <div class="form-floating mb-3">
                  <input
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    class="form-control bg-transparent text-white"
                    id="floatingInput"
                  />
                  <label for="floatingInput">Firstname</label>
                </div>
              </div>
              <div className="col">
                <div class="form-floating mb-3">
                  <input

                    class="form-control bg-transparent text-white"
                    id="floatingInput"
                  />
                  <label for="floatingInput">Middle name</label>
                </div>
              </div>
              <div className="col">
                <div class="form-floating mb-3">
                  <input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    class="form-control bg-transparent text-white"
                    id="floatingInput"
                  />
                  <label for="floatingInput">Lastname</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col w-50">
                <div class="form-floating mb-3">
                  <input
                    value={secemail}
                    onChange={(e) => setSecemail(e.target.value)}
                    class="form-control bg-transparent text-white"
                    id="floatingInput"
                  />
                  <label for="floatingInput">Add secondary email address</label>
                </div>
              </div>
            </div>
            <h4>Address information</h4>
            <div className="row mt-3">
              <div className="col">
                <div class="form-floating mb-3">
                  <input
                    value={adstate}
                    onChange={(e) => setAdstate(e.target.value)}
                    class="form-control bg-transparent text-white"
                    id="floatingInput"
                  />
                  <label for="floatingInput">State</label>
                </div>
              </div>
              <div className="col">
                <div class="form-floating mb-3">
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    class="form-control bg-transparent text-white"
                    id="floatingInput"
                  />
                  <label for="floatingInput">City</label>
                </div>
              </div>
              <div className="col">
                <div>
                  <label htmlFor='profileInput' >
                    Pick your profile
                  </label>
                  <input className='avatarBtn'
                    onChange={captureImage}
                    type="file" id='profileInput'
                  // className={style.profileInput}

                  />
                  {
                    image !== "" && <img className="mt-2 img-fluid bdr-50 ms-3" src={image} width={"10%"} alt="QuestionImage" />

                  }

                </div>
              </div>
            </div>
            <button onClick={UpdateInfo} className='btn btn-lg btn-primary w-100 shadow-0'>Save my info</button>
          </div>
          <div className={toggleState === 3 ? "tabcontent" : "content"}>
            <div className="mt-4">
              <h5 className='fw-bold'>Change your password</h5>
              <div class="form-floating mb-3 mt-3 w-50">
                <input
                  type={'password'}
                  value={oldpassword}
                  onChange={(e) => setOldpassword(e.target.value)}
                  class="form-control bg-transparent text-white"
                  id="floatingInput"
                />
                <label for="floatingInput">Current password</label>
              </div>
              <div class="form-floating mb-3 mt-3 w-50">
                <input
                  type={'password'}

                  value={newpassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                  class="form-control bg-transparent text-white"
                  id="floatingInput"
                />
                <label for="floatingInput">New password</label>
              </div>
              <div class="form-floating mb-3 mt-3 w-50">
                <input
                  type={'password'}
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  class="form-control bg-transparent text-white"
                  id="floatingInput"
                />
                <label for="floatingInput">Confirm password</label>
              </div>
              <p className='mb-2'>Double check the information before submitting!</p>
              <button onClick={UpdatePassword} className='btn btn-primary w-50 shadow-0 btn-lg'>Change password</button>
            </div>

          </div>
          <div className={toggleState === 4 ? "tabcontent" : "content"}>
            <div className="row mt-4">
              <div className="col flex-column-reverse">
                <h5 className='fw-bold'>Followers</h5>
                <hr />
                <div className="scroller">
                  {
                    proFollowers.map(item => {
                      return (
                        <>
                          <Link to={`/user/${item.id}`}>
                            <div className='d-flex pt-3 pb-3'>
                              <img className='bdr-50' src={item.profile} alt="" width={"10%"} />
                              <div className='ms-3'>
                                <div className="d-flex justify-content-between">
                                  <p className='me-3'>{item.fname}</p>
                                  <p><span class="badge border">view profile</span></p>
                                </div>
                                <p>@{item.username}</p>
                              </div>
                            </div>
                            <hr />
                          </Link>

                        </>
                      )
                    })
                  }

                </div>

              </div>

              <div className="col">
                <h5 className='fw-bold'>Followings</h5>
                <hr />
                <div className="scroller">
                  {
                    proFollowings.map(item => {
                      return (
                        <>
                          <Link to={`/user/${item.id}`}>
                            <div className='d-flex pt-3 pb-3'>
                              <img className='bdr-50' src={item.profile} alt="" width={"10%"} />
                              <div className='ms-3'>
                                <div className="d-flex justify-content-between">
                                  <p className='me-3'>{item.fname}</p>
                                  <p><span class="badge border">view profile</span></p>
                                </div>
                                <p>@{item.username}</p>
                              </div>
                            </div>
                          </Link>
                          <hr />
                        </>
                      )
                    })
                  }


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button ref={ref} type="button" class="btn btn-primary invisible" data-mdb-toggle="modal" data-mdb-target="#exampleModal1">
        Modal
      </button>



      <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content ModalCard">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit your Questions</h5>
              <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-outline">
                <p>Enter detail description of your questions...</p>
                <textarea value={qsn.questionName} placeholder="All your questions goes here ..." class="form-control text-white blurBox mb-2 mt-2" rows="4"></textarea>

              </div>
              <div className="d-flex justify-content-between">
                <div>
                <button type="button" class="btn ms-2 text-white" data-mdb-ripple-color="dark">
                    <label htmlFor="file">Photo</label>
                    <input type="file" name="file" id="file" className="imageInput"
                      multiple accept="image/*,video/*" onChange={handleChangeImages} />
                  </button>
                </div>
                {
                  imageValue? <img className="mt-2 img-fluid bdr-50 ms-3" src={imageValue} width={"10%"} alt="QuestionImage" />
                  : <img className="mt-2 img-fluid bdr-15" src={qsn.questionImage} width={"150px"} alt="QuestionImage" />
                }

              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn text-white" data-mdb-dismiss="modal">Close</button>
              <button type="button" class="btn text-white">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Profile;

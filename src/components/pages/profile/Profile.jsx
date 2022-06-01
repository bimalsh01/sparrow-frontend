import React, { useState, useEffect } from 'react';
import './Profile.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllQuestionsByUser, getUser, updateProfile } from '../../../http/Index';
import { setSnackbar } from '../../../store/SnackBar';
import { Link } from 'react-router-dom';
import { setProfile } from '../../../store/Slice';


export const Profile = () => {
  const [followerslength,setfollowerslength] = useState(null);
  const [followinglength,setfollowinglength] = useState(null);

  const { id, fname,secondaryEmail, lname,profile, username,  followers, following, phone, address } = useSelector(state => state.Auth.user);
  const {profile_upload} = useSelector(state => state.Auth);

  const [toggleState, setToggleState] = React.useState(1);
  const [image, setImage] = useState("");
  let [data, setData] = useState([]);

  const [firstname, setFirstname] = useState(fname);
  const [lastname, setLastname] = useState(lname);
  const [secemail, setSecemail] = useState(secondaryEmail);
  const [adstate, setAdstate] = useState(address[0].state);
  const [city, setCity] = useState(address[0].state);
  const dispatch = useDispatch();

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
      setData(res.data);
    })
  }, [])

  useEffect(() => {
    getUser(id).then(res => {
      setfollowerslength(res.data.user.followers.length);
      setfollowinglength(res.data.user.followings.length);
  })
  },[])

  console.log(data, "data");
 

  async function UpdateInfo(e) {
    e.preventDefault();
    console.log("Hello");
    if (!id || !firstname || !lastname || !secemail || !adstate || !city) {
      dispatch(setSnackbar(true, "error", "error", "Please fill up all the fields!"));
      return;
    }

    try {
      const { data } = await updateProfile({ id: id, fname: firstname, lname: lastname, secondaryEmail: secemail, state: adstate, city: city, profile: profile_upload });
      console.log(data);
      dispatch(setSnackbar(true, "success", "success", "Updated"));

    } catch (error) {
      console.log(error);
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
            {/* <h2>Bimal Shrestha</h2> */}
            <span class="badge bg-primary">@{username}</span>
            {/* <span class="badge bg-primary">@bimals</span> */}

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
                <h4>Exp. 38</h4>
              </div>

            </div>
          </div>
          <div className='d-flex align-items-center me-5'>
            <div className='me-4'>
              <img src="/images/qsn.png" alt="" width={"100%"} />
              <p>Answers</p>
              <h4 className='fw-bold'>100+</h4>
            </div>
            <div>
              <img src="/images/ans.png" alt="" width={"100%"} />
              <p>Answers</p>
              <h4 className='fw-bold'>1M+</h4>
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
                  data.map( item =>{
                    return(
                      <div>
                      
                      <Link to={`/qnapage/${item._id}`}>
                      <p className='mt-3'>{item.questionName}</p>
                                </Link>
                      <p className='fw-bold'>Asken on {item.createdAt}</p>
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  class="form-control bg-transparent text-white"
                  id="floatingInput"
                />
                <label for="floatingInput">Current password</label>
              </div>
              <div class="form-floating mb-3 mt-3 w-50">
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  class="form-control bg-transparent text-white"
                  id="floatingInput"
                />
                <label for="floatingInput">New password</label>
              </div>
              <div class="form-floating mb-3 mt-3 w-50">
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  class="form-control bg-transparent text-white"
                  id="floatingInput"
                />
                <label for="floatingInput">Confirm password</label>
              </div>
              <button className='btn btn-primary w-50 shadow-0 btn-lg'>Change password</button>
            </div>

          </div>
          <div className={toggleState === 4 ? "tabcontent" : "content"}>
            <div className="row mt-4">
              <div className="col flex-column-reverse">
                <h5 className='fw-bold'>Followers</h5>
                <hr />
                <div className="scroller">
                  <div className='d-flex pt-3 pb-3'>
                    <img className='bdr-50' src="/images/2.jpg" alt="" width={"10%"} />
                    <div className='ms-3'>
                      <div className="d-flex justify-content-between">
                        <p className='me-3'>Bimal Shrestha</p>
                        <a className='text-light' href="#">Follow</a>
                      </div>
                      <p>@bimals</p>
                    </div>
                  </div>
                  <hr />
                  <div className='d-flex pt-3 pb-3'>
                    <img className='bdr-50' src="/images/2.jpg" alt="" width={"10%"} />
                    <div className='ms-3'>
                      <div className="d-flex justify-content-between">
                        <p className='me-3'>Bimal Shrestha</p>
                        <a className='text-light' href="#">Follow</a>
                      </div>
                      <p>@bimals</p>
                    </div>
                  </div>
                  <hr />
                  <div className='d-flex pt-3 pb-3'>
                    <img className='bdr-50' src="/images/2.jpg" alt="" width={"10%"} />
                    <div className='ms-3'>
                      <div className="d-flex justify-content-between">
                        <p className='me-3'>Bimal Shrestha</p>
                        <a className='text-light' href="#">Follow</a>
                      </div>
                      <p>@bimals</p>
                    </div>
                  </div>
                  <hr />
                  <div className='d-flex pt-3 pb-3'>
                    <img className='bdr-50' src="/images/2.jpg" alt="" width={"10%"} />
                    <div className='ms-3'>
                      <div className="d-flex justify-content-between">
                        <p className='me-3'>Bimal Shrestha</p>
                        <a className='text-light' href="#">Follow</a>
                      </div>
                      <p>@bimals</p>
                    </div>
                  </div>

                </div>

              </div>

              <div className="col">
                <h5 className='fw-bold'>Followers</h5>
                <hr />
                <div className="scroller">
                  <div className='d-flex pt-3 pb-3'>
                    <img className='bdr-50' src="/images/2.jpg" alt="" width={"10%"} />
                    <div className='ms-3'>
                      <div className="d-flex justify-content-between">
                        <p className='me-3'>Bimal Shrestha</p>
                        <a className='text-light' href="#">Follow</a>
                      </div>
                      <p>@bimals</p>
                    </div>
                  </div>
                  <hr />
                  <div className='d-flex pt-3 pb-3'>
                    <img className='bdr-50' src="/images/2.jpg" alt="" width={"10%"} />
                    <div className='ms-3'>
                      <div className="d-flex justify-content-between">
                        <p className='me-3'>Bimal Shrestha</p>
                        <a className='text-light' href="#">Follow</a>
                      </div>
                      <p>@bimals</p>
                    </div>
                  </div>
                  <hr />
                  <div className='d-flex pt-3 pb-3'>
                    <img className='bdr-50' src="/images/2.jpg" alt="" width={"10%"} />
                    <div className='ms-3'>
                      <div className="d-flex justify-content-between">
                        <p className='me-3'>Bimal Shrestha</p>
                        <a className='text-light' href="#">Follow</a>
                      </div>
                      <p>@bimals</p>
                    </div>
                  </div>
                  <hr />
                  <div className='d-flex pt-3 pb-3'>
                    <img className='bdr-50' src="/images/2.jpg" alt="" width={"10%"} />
                    <div className='ms-3'>
                      <div className="d-flex justify-content-between">
                        <p className='me-3'>Bimal Shrestha</p>
                        <a className='text-light' href="#">Follow</a>
                      </div>
                      <p>@bimals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile;

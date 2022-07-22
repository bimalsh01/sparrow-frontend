import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import 'react-responsive-modal/styles.css';
import Avatar from "../avatar/Avatar";
import { setSnackbar } from "../../../store/SnackBar";
import { logout, questions } from "../../../http/Index";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/Slice";
import { Search } from "../search/Search";


const Navbar = () => {
  const [imageValue, setImagesValue] = useState("")
  const [questionValue, setQuestionValue] = useState("")
  const { isAuth } = useSelector(state => state.Auth)


  const dispatch = useDispatch();

  async function Clicked() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));

    } catch (error) {
      console.log(error);
    }
    dispatch(setSnackbar(true, "error", "error", "Logout Success!"));
  }

  async function Submit() {
    if (!questionValue) {
      dispatch(setSnackbar(true, "error", "error", "Please enter your question"));
    }
    try {
      console.log(questionValue, imageValue);
      const { data } = await questions({ questionName: questionValue, qsnPhoto: imageValue });
      dispatch(setSnackbar(true, "success", "success", "Your question has been submitted"));
    } catch (error) {
      dispatch(setSnackbar(true, "error", "error", "Failed to submit your question"));
      console.log(error)
    }
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

  const snackBar = () => {
    dispatch(setSnackbar(true, "success", "success", "Snackbar is open"));
  }

  return (
    <>
      <nav className="container navbar navbar-expand-lg navbar-light sticky-top justify-content-around ">
        <div className="container">
          <Link to={"/"}>
            <h3 className="fw-bold">
              <i class="fa-solid fa-dove"></i> Sparrow
            </h3>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-white"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <li>
                <Search />
              </li>
            </ul>
            <ul>
              <div className="d-flex align-items-center mt-3">

                <button data-mdb-toggle="modal" data-mdb-target="#exampleModal" type="button" className="btn btn-danger me-3">
                  ASK
                </button>


                {
                  isAuth ? <>

                    <div class="dropdown ">
                      <a
                        class="dropdown-toggle d-flex align-items-center hidden-arrow"
                        href="#"
                        id="navbarDropdownMenuAvatar"
                        role="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <Avatar width={"39px"} />
                      </a>
                      <ul
                        class="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuAvatar"
                      >
                        <li>
                          <Link className="me-2" to={"/profile"}>

                            <a class="dropdown-item" href="#">My profile</a>

                          </Link>
                        </li>

                        <li>
                          <Link className="me-2" to={"/profile"}>

                            <button onClick={Clicked} className="dropdown-item">Logout</button>

                          </Link>
                        </li>
                      </ul>
                    </div>

                  </>
                    :
                    <Link to={'/login'}>
                      <button className="btn"><i class="fa-solid fa-right-to-bracket"></i></button>
                    </Link>
                }

              </div>
            </ul>
          </div>
        </div>
      </nav >
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content ModalCard">
            <div class="modal-header">
              <div>
                <h5 class="modal-title fw-bold" id="exampleModalLabel">What is on your mind?</h5>


              </div>
              <button type="button-pr" class="btn-close btn-danger" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <div class="form-outline">
                <p>Enter detail description of your questions...</p>
                <textarea onChange={(e) => setQuestionValue(e.target.value)} placeholder="All your questions goes here ..." class="form-control text-white blurBox mb-2 mt-2" rows="4"></textarea>

              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <button type="button" class="btn ms-2 text-white" data-mdb-ripple-color="dark"><i class="fa-solid fa-image"></i>
                    <label htmlFor="file">Photo</label>
                    <input type="file" name="file" id="file" className="imageInput"
                      multiple accept="image/*,video/*" onChange={handleChangeImages} />
                  </button>

                  <button type="button" class="btn ms-2 text-white" data-mdb-ripple-color="dark"><i class="fa-solid fa-camera"></i> Camera</button>


                </div>
                {
                  imageValue !== "" && <img className="mt-2 img-fluid bdr-15" src={imageValue} width={"150px"} alt="QuestionImage" />
                }

              </div>

            </div>
            <div class="modal-footer d-flex justify-content-between">

              <div className="d-flex align-items-center">
                <Avatar width={"30px"} />
                <p className="ms-2">Public</p>
              </div>
              <div>
                <button onClick={Submit} type="button" class="btn btn-primary w-100">Add questions</button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

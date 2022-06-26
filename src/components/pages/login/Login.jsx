import React, { useState } from "react";
import Card from "../../common/card/Card";
import { Link } from "react-router-dom";
import "./Login.css";
import { login } from "../../../http/Index";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/Slice";
import { setSnackbar } from "../../../store/SnackBar";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function loginClick(e) {
    e.preventDefault();
    const { data } = await login({ phone, password });
    console.log(data);

    if (data.status === 404) {
      dispatch(setSnackbar(true, "error", "error", "User not found!"));
  
      }

    // is json return is 401 then show error
    if (data.status === 401) {
    dispatch(setSnackbar(true, "error", "error", "Password is incorrect"));

    }

    dispatch(setAuth(data));
    dispatch(setSnackbar(true, "success", "success", "Login Successful"));
  }

  return (
    <>
      <Card title="Login" desc="Welcome back! Just get back to your account.">
        <div class="col-md-10 mx-auto col-lg-5">
          <form>
            <div class="form-floating mb-3">
              <input
                onChange={(e) => setPhone(e.target.value)}
                class="form-control bg-transparent text-white"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Number | Username</label>
            </div>
            <div class="form-floating mb-3">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                class="form-control bg-transparent text-white"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Enter your passcode</label>
            </div>
            <a href=""><p>Forgot passcode?</p></a>
            <button onClick={loginClick} class="w-100 btn shadow-0 btn-lg btn-primary" type="">
              Login  <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
            <small class="text-muted">
              By clicking Login, you will enter in next  world. <br />

            </small>
            <Link className="text-white" to={"/authenticate"}>
              Create New Account
            </Link>

          </form>
        </div>
      </Card>

    </>
  );
};

export default Login;

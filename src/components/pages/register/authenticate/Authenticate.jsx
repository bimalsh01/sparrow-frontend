import React, { useState } from "react";
import Card from "../../../common/card/Card";
import { setAuth, setOtp } from "../../../../store/Slice";
import { sendOtp, verifyOtp } from "../../../../http/Index";
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from "../../../../store/SnackBar";

const Authenticate = () => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const dispatch = useDispatch();
  const { phone, hash } = useSelector((state) => state.Auth.otp)

  async function Submit(e) {
    e.preventDefault();
    if (!phoneNumber) {
      return;
    }
    // Server request
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    dispatch(setSnackbar(true, "success", "success", "OTP has been sent!"));
  }

  async function Verify(e) {
    if (!userOtp || !phone || !hash) {
      return;
    }
    try {
      const { data } = await verifyOtp({ phone: phone, hash: hash, userOtp: userOtp })
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(setAuth(data), setSnackbar(true, "success", "OTP verified successfully"));
      // dispatch(setSnackbar(true, "success","success", "Your number has been verified, please activate your account"));
    } catch (error) {
      console.log(error);
      dispatch(setSnackbar(true,"error","error", "OTP verification failed!"));

    }
  }


  return (
    <Card title="Authentication" desc="Please provide valid email to get code.">
      <div class="col-md-10 mx-auto col-lg-5">
        <form>
          <div class="form-floating mb-3">
            <input
              type={Number}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              class="form-control bg-transparent text-white"
              id="floatingInput"
              placeholder="98#######1"
            />
            <label for="floatingInput">Enter Valid Phone Number</label>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-3">
                <input
                  type={Number}
                  value={userOtp}
                  onChange={(e) => setUserOtp(e.target.value)}
                  class="form-control bg-transparent text-white"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Code</label>
              </div>
            </div>
            <div class="col">
              <button onClick={Submit} class="w-100 btn shadow-0 btn-lg btn-primary h-45" type="">
                Get Code
              </button>
            </div>
          </div>

          <small>
            Make sure you have entered correct PIN code. <br />
          </small>
          <hr />

          <button onClick={Verify} class="w-100 btn shadow-0 btn-lg btn-success" type="">
            Verify <i class="fa-solid fa-fingerprint"></i>
          </button>




        </form>


      </div>
    </Card>
  );
};

export default Authenticate;

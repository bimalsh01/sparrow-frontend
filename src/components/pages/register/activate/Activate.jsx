import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activate } from '../../../../http/Index';
import { setAuth } from '../../../../store/Slice';
import { setSnackbar } from '../../../../store/SnackBar';
import Card from '../../../common/card/Card'
import Loader from '../../../common/loader/Loader';

const Activate = () => {
  const {username, password} = useSelector((state) => state.Auth.user);
  const {phone} = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();
  const [usernameValue,setUsernameValue] = useState("");
  const [passwordValue,setPasswordValue] = useState("");
  const [confPass,setConfPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [unmounted, setUnmounted] = useState(false);


  async function handleClick(e){
    e.preventDefault();
    if(!usernameValue || !passwordValue){
      dispatch(setSnackbar(true, "error","error", "Please fill up all the fields!"));
      return;
    }
    if(passwordValue !== confPass){
      dispatch(setSnackbar(true, "error","error", "Password and confirm password does not match!"));
      return;
    }

    setLoading(true);
    
    try {
      const {data} = await activate({username:usernameValue,password:confPass});
      console.log(data);
      if(data.Auth){
        dispatch(setAuth(data))
      }
      dispatch(setSnackbar(true, "success","success", "Your account has been activated successfully!"));
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
  }

  useEffect(()=>{
    return () =>{
      setUnmounted(true);
    }
  });
  
  if (loading) return <Loader message={"Activating"}/>;


  return (
    <Card extra={phone} title={"Activation"} desc={"We need something more from you!"} >
      <div class="col-md-10 mx-auto col-lg-5">
        <form>
          {/* <img src="/images/user.jpg" width={"50px"} className="bdr-50" alt="" /> */}

          <div class="form-floating mb-3">
            <input
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              class="form-control bg-transparent text-white"
              id="floatingInput"
            />
            <label for="floatingInput">Create username</label>
          </div>

          <div class="form-floating mb-3">
            <input
              onChange={(e) => setPasswordValue(e.target.value)}
              class="form-control bg-transparent text-white"
              id="floatingInput"
              type={'password'}
            />
            <label for="floatingInput">Passcode</label>
          </div>

          <div class="form-floating mb-3">
            <input
              onChange={(e) => setConfPass(e.target.value)}
              class="form-control bg-transparent text-white"
              id="floatingInput"
              type="password"
            />
            <label for="floatingInput">Confirm passcode</label>
          </div>

          <button onClick={handleClick} class="btn btn-lg btn-primary btn-block shadow-0">Activate Account</button>

        </form>
      </div>



    </Card>
  )
}

export default Activate
import './App.css';
import Navbar from './components/common/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from './components/pages/login/Login';
import { useSelector } from 'react-redux';
import Authenticate from './components/pages/register/authenticate/Authenticate';
import Home from './components/pages/home/Home';
import Activate from './components/pages/register/activate/Activate';
import { useLoadingHooks } from "./hooks/useLoadingHooks";
import Loader from './components/common/loader/Loader';
import Profile from './components/pages/profile/Profile';
import SnackBar from './components/common/snackbar/Snackbar';
import QnaPage from './components/pages/qnaPage/QnaPage';
import Main from './components/pages/main/Main';
import OtherUser from './components/pages/otherUser/OtherUser';
import Message from './components/pages/message/Message';
import Admin from './components/pages/admin/Admin';
import SearchResult from './components/pages/searchResult/SearchResult';
import Favourite from './components/pages/favourite/Favourite';


function App() {

  const {loading} = useLoadingHooks();

  return loading ? (
    <Loader message={"we are processing your request 🔃"} />
  ) : (
    <>
    <SnackBar />
      <Router>
        <Navbar />
        <Routes>
          
          <Route element={<GuestRoute />}>
            <Route path="/" exact element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/authenticate" element={<Authenticate />} />
          </Route>

          <Route element={<SemiProtected />}>
            <Route path="/activate" element={<Activate />} />
          </Route>

          <Route element={<Protected />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path='/qnapage/:id' exact element={<QnaPage/>}/>
            <Route path='/user/:id' exact element={<OtherUser/>}/>
            <Route path='/message' exace element={<Message/>} />
            <Route path='/search' exace element={<SearchResult/>} />
            <Route path='/favourite' exace element={<Favourite/>} />


      
          </Route>

          <Route path='/admin' exact element={<Admin/>} />

        </Routes>
      </Router>
    </>
  );
}


const GuestRoute = () => {
  const { isAuth } = useSelector((state) => state.Auth);
  // const isAuth = useAuth();
  return isAuth ?
    <Navigate to={"/dashboard"} />
    :
    <Outlet />;
};

const SemiProtected = () => {
  const { user, isAuth } = useSelector((state) => state.Auth);
  // const isAuth = useAuth();
  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !user.activated ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} />
  );
};

const Protected = () => {
  const { user, isAuth } = useSelector((state) => state.Auth);
  // const isAuth = useAuth();
  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !user.activated ? (
    <Navigate to={"/activate"} />
  ) : (
    <Outlet />
  );
};

export default App;

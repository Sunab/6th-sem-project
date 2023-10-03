import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './Login.css';
import {Link} from "react-router-dom";
import {  login,clearErrors } from '../../Action/UserAction';

const Login = () => {
    const [Email,setEmail] = useState("");
    const [Password, setPassword]= useState("");

    const dispatch=useDispatch();
    const {error} = useSelector((state) => state.user);
  
    const handleSubmit  =() => {
      console.log('submit call bhayio');
        dispatch(login(Email,Password));
    };
    useEffect(() => {
      if (error) {
        alert(error);
        dispatch(clearErrors());
      }
    }, [error, dispatch]);
  
  return (
    <div className="login-container">
    <form className="login-form">
      <h1> Admin Login </h1> 
      <div>

      <input
        type="email"
        placeholder="Email Address"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <div>
      <input
        type="password"
        placeholder="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        />
        </div>
      <Link to="/password/forgot">Forgot Password?</Link>
      <button type="submit" onClick={handleSubmit} >Login</button>
    </form>
  </div>
  );
};

export default Login
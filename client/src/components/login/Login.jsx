import React, { useState,useContext } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { LoginContext } from '../context/LoginContext';
import toast from "react-hot-toast";
import './login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const loginContext=useContext(LoginContext);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams(credentials).toString();
      const response = await axios.get(`${API_BASE_URL}/api/v1/login?${queryParams}`);
      loginContext.setIsActive(response ? true : false);
      navigate("/");
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Error in Login !!');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/signUp`, credentials);
      setCredentials({
        name: '',
        email: '',
        password: '',
      });

      if(res)
        toast.success('An account with this email already exists. Please log in instead.');
      else
        toast.success('Sign up successful!, Login now');
        
    } catch (err) {
      console.error('Sign-up error:', err);
      toast.error('Error in Sign-up !!');
    }
  };

  return (
    <div className="form">
      <div className="main">
        <input className="inputstyle" type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form>
            <label className="labelstyle" htmlFor="chk" aria-hidden="true">Sign up</label>
            <input className="inputstyle" type="text" id="name" value={credentials.name} placeholder="User name" required onChange={handleChange} />
            <input className="inputstyle" type="email" id="email" value={credentials.email} placeholder="Email" required onChange={handleChange} />
            <input className="inputstyle" type="password" id="password" value={credentials.password} placeholder="Password" required onChange={handleChange} />
            <button className="btnstyle" type="button" onClick={handleSignUp}>Sign up</button>
          </form>
        </div>

        <div className="login">
          <form>
            <label className="labelstyle" htmlFor="chk" aria-hidden="true">Login</label>
            <input className="inputstyle" type="email" id="email" value={credentials.email} placeholder="Email" required onChange={handleChange} />
            <input className="inputstyle" type="password" id="password" value={credentials.password} placeholder="Password" required onChange={handleChange} />
            <button className="btnstyle" type="button" onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import './LogIn.css';
import { Link, useNavigate } from 'react-router-dom';
import config from "../../config.json";
import axios from 'axios';

const LogIn = () => {
    const [user, setUser] = useState({email:"", password:""});
    const [errorMsg, setErrorMsg] = useState("");

    const { email, password } = user;
    const navigate = useNavigate();

    const onInputChange = (e) => {
        setUser(prevState=> ({...prevState,[e.target.name]: e.target.value}));
    };

    const LogInHandler = async (e) => {
        e.preventDefault();
        try {
           const request = await axios.post(`${config.apiUrl}/login`, user, {
             withCredentials: true,
           });
           if(request.data){
            navigate('/profile');
           }
        } catch (error) {
            if (
              error.response &&
              error.response.status >= 400 &&
              error.response.status <= 500
            ) {
              setErrorMsg(error.response.data.message);
            }
        }
    }
  return (
    <>
      <div className="LogIn">
        <h1>Login</h1>
        {errorMsg && <div className="signUpErrorMsg">{errorMsg}</div>}
        <form action="" onSubmit={LogInHandler}>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              placeholder="Email..."
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              placeholder="Password..."
              required
            />
          </div>
          <button type="submit">Log In</button>
          <span>
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default LogIn
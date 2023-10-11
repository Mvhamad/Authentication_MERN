import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config.json';

const SignUp = () => {
    const [newUser, setNewUser] = useState({username:"", email:"", password:""});
    const [errorMsg, setErrorMsg] = useState("")
    
    const { username, email, password } = newUser;
    const navigate = useNavigate();

    //function to change the input value
    const onChangeHandler = (e) => {
        setNewUser({...newUser,[e.target.name]: e.target.value})
    };

    // function to handle the sign up 
    const signUpHandler = async (e) => {
        e.preventDefault();
        try {
            const request = await axios.post(`${config.apiUrl}/signup`, newUser)
            if(request.data) {
                alert("You have successfully signed up! Please log in now.")
                navigate('/');
            }
        } catch (error) {
            if (
              error.response &&
              error.response.status >= 400 &&
              error.response.status <= 500
            ) {
              setErrorMsg(error.response.data.message);
            } else {
                 setErrorMsg(
                   "An error occurred while signing up. Please try again later."
                 );
            }
        }
    };
  return (
    <>
      <div className="SignUp">
        <h1>Sign Up</h1>
        {errorMsg && <div className="signUpErrorMsg">{errorMsg}</div>}
        <form onSubmit={signUpHandler}>
          <div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChangeHandler}
              placeholder="Username..."
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeHandler}
              placeholder="Email..."
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChangeHandler}
              placeholder="Password..."
              required
            />
          </div>
          <button type="submit">Sign Up</button>
          <span>
            Already have an account? <Link to={"/"}>Login</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default SignUp
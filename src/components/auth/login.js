import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../assets/images/Loader123.gif';
import Swal from 'sweetalert2';

const Login = () => {
  const [name, setName] = useState()
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useNavigate(); 
    
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const handleFormSubmit =(e)=> {
    e.preventDefault();

    const data = {
      employeeName: name,
      password: password,
    };
    const url_login = `http://localhost:5206/Users/Login`;
    
    axios.post(url_login, data, config)
    .then((response) => {
      console.log('Successfull:', response.data);
      localStorage.setItem('data', JSON.stringify(response.data[0]));
      Swal.fire({
        icon: (response.data.error) ? 'error' : 'success',
        title: (response.data.error) ? response.data.error : "User Logged-in Successfully!",
        showConfirmButton: false,
        timer:1500,
      })  
      history("/dashboard/personal")
    })
    .catch((error) => {
      console.error('Error sending data:', error.message);
      Swal.fire({
        icon: (error) ? 'error' : '',
        title: (error) ? error.message : "",
        showConfirmButton: false,
        timer:1500,
      }) 
    });
  };

  return (
    <>
      <div id="login" className="modal-window">
        <div>
          <a href="#" title="Close" className="modal-close">
            X
          </a>
          <h1>LOGIN</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Employee Name</label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password" 
                name="password"
                autoComplete="off"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="btn-sbmt-cont">
              <button type="submit" value="Login" className="btn-sbmt" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <img src={Loader} className="loginbtn-loader" alt="Loader" /> Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
          <p>
            {error && <div className="error-message">{error}</div>}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
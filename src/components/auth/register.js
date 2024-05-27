import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../assets/images/Loader123.gif';
import Swal from 'sweetalert2';

const Register = () => {
  const [name, setName] = useState('')
  const [empId, setEmpId] = useState()
  const [designation, setDesignation] = useState('')
  const [project, setProject] = useState('')
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
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
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(confirmpassword!=password){
      setError("Password and Confirm Password do not match!")
      Swal.fire({
        icon: (error) ? 'error' : '',
        title: (error) ? error : "",
        showConfirmButton: false,
        timer:1500,
      })
    }
    else if(regex.test(password)==false){
      setError("Doesn't Follow Password Parameters!")
      Swal.fire({
        icon: (error) ? 'error' : '',
        title: (error) ? error : "",
        showConfirmButton: false,
        timer:1500,
      })
    }
    else{

    const data = {
      employeeName: name,
      designation:designation,
      project:project,
      password: password,
    };

    const url_register = `http://localhost:5206/Users/Create`;

    axios.post(url_register, data, config)
    .then((response) => {
      console.log('Successfull', response.data);
      Swal.fire({
        icon: (response.data.error) ? 'error' : 'success',
        title: (response.data.error) ? response.data.error : "User Registered Successfully!",
        showConfirmButton: false,
        timer:1500,
      })  
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
    setIsLoading(false)
  }
  };


  return (
    <>
      <div id="register" className="modal-window modal-window-register">
        <div>
          <a href="#" title="Close" className="modal-close">
            X
          </a>
          <h1>SIGN UP</h1>
          <form onSubmit={handleFormSubmit}>


          <div className='row'>
                <div className="form-group col-sm-12">
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
            </div>


            <div className='row'>
                
            <div className="form-group col-sm-6">
                <label htmlFor="designation">Employee Designation</label>
                <input
                    type="text"
                    name="designation"
                    autoComplete="off"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                />
                </div>
                <div className="form-group col-sm-6">
                    <label htmlFor="project">Project Name</label>
                    <input
                        type="text" 
                        name="project"
                        autoComplete="off"
                        required
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                    />
                </div>
            </div>


            <div className='row'>
                <div className="form-group col-sm-6">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="email"
                        autoComplete="off"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group col-sm-6">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                    type="password" 
                    name="confirmpassword"
                    autoComplete="off"
                    required
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
            </div>


            <div className="btn-sbmt-cont">
              <button type="submit" value="Login" className="btn-sbmt" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <img src={Loader} className="loginbtn-loader" alt="Loader" /> Signing up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
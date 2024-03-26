import React from "react"
import Register from "../auth/register";
import Login from "../auth/login";
import '../../assets/css/form.css'
import '../../assets/css/modal.css'

const Navbar = () => {
  let URL = 'http://localhost:3000';
  return (
<>
<nav class="navbar navbar-expand-lg navbar-light shadow">
  <a class="navbar-brand" href="#">BuckBuddy</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
      <li class="nav-item">
        <a href={`${URL}/#login`} class="nav-link nav-link-auth">Login</a> <Login />
      </li>
      <li class="nav-item">
        <a href={`${URL}/#register`} class="nav-link nav-link-auth">Signup</a> <Register />
      </li>

    </ul>
  </div>
</nav>
</>
  )
};

export default Navbar;

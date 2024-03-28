import React, { useState, useEffect, useContext } from 'react';
import LogoutIcon from '../../assets/logos/exit.png'
import AddExpense from "./addNewExpense";


const NavbarDashboard = () => {
  
  const [empName, setEmpName] = useState(JSON.parse(localStorage.getItem('data')).employeeName);

    let URL = 'http://localhost:3000';
    return (
  <>
  <nav class="navbar navbar-expand-lg navbar-light shadow">
    <a class="navbar-brand" href="#">Welcome {empName}!</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
      <li class="nav-item active">
          <a class="nav-link add-new-btn" style={{'paddingRight' : '18px', 'paddingLeft' : '20px'}} href={`${URL}/dashboard/personal`} >Personal Expenses</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link add-new-btn" style={{'paddingRight' : '18px', 'paddingLeft' : '20px'}} href={`${URL}/dashboard/manager`} >Team Expenses</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link add-new-btn" style={{'paddingRight' : '15px'}} href={`${URL}/dashboard/manager/#addexpense`} > <span className="plus-button">+</span> New Expense</a> <AddExpense />
        </li>
        <li class="nav-item active">
          <a class="nav-link add-new-btn" style={{'paddingRight' : '18px', 'paddingLeft' : '20px'}} href={`${URL}`} ><img src={LogoutIcon} className="logout-icon"></img></a>
        </li>
  
      </ul>
    </div>
  </nav>
  </>
    )
};

export default NavbarDashboard;

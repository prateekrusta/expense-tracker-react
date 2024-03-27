import React, { useState, useEffect, useContext } from 'react';
import LogoutIcon from '../../assets/logos/exit.png'
import AddExpense from "./addNewExpense";


const NavbarDashboard = () => {

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setDatas(data);
    }
  }, []);

    let URL = 'http://localhost:3000';
    return (
  <>
  <nav class="navbar navbar-expand-lg navbar-light shadow">
    <a class="navbar-brand" href="#">Welcome {datas.employeeName}!</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link add-new-btn" style={{'paddingRight' : '15px'}} href={`${URL}/dashboard/#addexpense`} > <span className="plus-button">+</span> New Expense</a> <AddExpense />
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

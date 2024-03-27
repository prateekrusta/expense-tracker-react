import React, { useState, useEffect } from 'react';
import NavbarDashboard from "./navbar-dashboard";
import '../../assets/css/dashboard.css';
import axios from 'axios'
import DeleteIcon from '../../assets/images/delete.png'
import EditIcon from '../../assets/images/edit.png'
import DescriptionIcon from '../../assets/images/description.png'
import EditExpense from './editExpense';
import { Link, useNavigate } from 'react-router-dom';
import Tick from '../../assets/images/check.png';
import Wrong from '../../assets/images/close.png';


const DashboardBanner = () => {
  let URL_PROD = 'http://localhost:3000';
  const history = useNavigate(); 

  const [expenseList, setExpenseList] = useState([]);
  const [managerexpenseList, setManagerExpenseList] = useState([]);
  const [selectedexpenseId, setSelectedexpenseId] = useState([]);
  
  const url_get='http://localhost:5206/Expenses'
  useEffect(() => {
    
    axios.get(url_get)
      .then(result => {
        console.log('Personal Expenses Fetched!');
        setExpenseList(result.data)
        console.log(expenseList);

      })
      .catch(error => {
        console.error('Error fetching Session List:', error);
      });
  }, []);


  const url_manager_get='http://localhost:5206/Expenses'
  useEffect(() => {
    
    axios.get(url_manager_get)
      .then(result => {
        console.log('Team Expenses Fetched!');
        setManagerExpenseList(result.data)
        console.log(managerexpenseList);

      })
      .catch(error => {
        console.error('Error fetching Session List:', error);
      });
  }, []);

  const handleEdit =(e)=> {
    e.preventDefault();
    console.log(selectedexpenseId)
  };

  const handleDelete =(e)=> {
    e.preventDefault();
    console.log(selectedexpenseId)

    
    axios.delete(`http://localhost:5206/Expenses/${selectedexpenseId}`)
    .then(response => {
      console.log(`Deleted post with ID ${selectedexpenseId}`);
    })
    .catch(error => {
      console.error(error);
    });


      axios.get(url_get)
        .then(result => {
          console.log('Expenses Fetched');
          setExpenseList(result.data)
          console.log(expenseList);
  
        })
        .catch(error => {
          console.error('Error fetching Session List:', error);
        });
  };

  const handleDesc =(e)=> {
    e.preventDefault();
    console.log(selectedexpenseId)
  };

  return (
    <>
    <NavbarDashboard />
        <div className="banner-outer">
            <div className="banner row">
              <div className="banner-left col-sm-5">
                <div className='heading-dashboard'>Personal Expenses</div>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {Array.isArray(expenseList) && expenseList.length > 0 ? (
                          expenseList.map((expenseList) => (
                            <tr>
                            <td scope="row">{expenseList.expenseId}</td>
                            <td>{expenseList.type}</td>
                            <td>{expenseList.date.substring(0, expenseList.date.length - 9)}</td>
                            <td>{expenseList.status}</td>
                            <td>
                              <a href="#" onClick={(e) => { setSelectedexpenseId(expenseList.expenseId); handleDesc(e);}}><button className='button-banner-expense-list' style={{'borderColor' : 'blue'}}><img src={DescriptionIcon} className='banner-expense-list-icons' style={{'width':'15px'}}/></button></a>
                              {(expenseList.status) != "Pending" ? <></> : <span>
                              <a href={`${URL_PROD}/dashboard/#editExpense`} onClick={(e) => setSelectedexpenseId(expenseList.expenseId)}><button className='button-banner-expense-list' style={{'borderColor' : 'green'}}><img src={EditIcon} className='banner-expense-list-icons'/></button></a><EditExpense expenseid={expenseList.expenseId}/>
                              <a href="#" onClick={(e) => { setSelectedexpenseId(expenseList.expenseId); handleDelete(e);}}><button className='button-banner-expense-list' style={{'borderColor' : 'red'}}><img src={DeleteIcon} className='banner-expense-list-icons'/></button></a>
                              </span>
                              }
                            </td>
                          </tr>
                          ))) : <></> }
                  </table>
                </div>
              <div className='col-sm-2'>

              </div>
              <div className="banner-right col-sm-5">
                <div className='heading-dashboard'>Team Expenses</div>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {Array.isArray(managerexpenseList) && managerexpenseList.length > 0 ? (
                          managerexpenseList.map((managerexpenseList) => (
                            <tr>
                            <td scope="row">{managerexpenseList.expenseId}</td>
                            <td>{managerexpenseList.type}</td>
                            <td>{managerexpenseList.date}</td>
                            <td>{managerexpenseList.status}</td>
                            <td>
                              <a href={`${URL_PROD}/dashboard/#editExpense`} onClick={(e) => setSelectedexpenseId(managerexpenseList.expenseId)}><button className='button-banner-expense-list' style={{'borderColor' : 'green'}}><img src={Tick} className='banner-expense-list-icons'/></button></a><EditExpense />
                              <a href="#" onClick={(e) => { setSelectedexpenseId(managerexpenseList.expenseId); handleDelete(e);}}><button className='button-banner-expense-list' style={{'borderColor' : 'red'}}><img src={Wrong} className='banner-expense-list-icons'/></button></a>
                            </td>
                          </tr>
                          ))) : <></> }
                  </table>
                </div>
            </div>
        </div>
    </>
  )
};

export default DashboardBanner;

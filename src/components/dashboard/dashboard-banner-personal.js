import React, { useState, useEffect } from 'react';
import NavbarDashboard from "./navbar-dashboard-personal";
import '../../assets/css/dashboard.css';
import axios from 'axios'
import DeleteIcon from '../../assets/images/delete.png'
import EditIcon from '../../assets/images/edit.png'
import EditExpense from './editExpense';



const DashboardBannerPersonal = () => {
  let URL_PROD = 'http://localhost:3000';

  const [expenseList, setExpenseList] = useState([]);
  const [selectedexpenseId, setSelectedexpenseId] = useState();
  const [empName, setEmpName] = useState(JSON.parse(localStorage.getItem('data')).employeeName);
  const [filtertype, setFilterType] = useState('All');
  const [filterstatus, setFilterStatus] = useState('All');


  const url_get=`http://localhost:5206/Expenses/personal?empName=${empName}`;
  useEffect(() => {
    axios.get(url_get)
      .then(result => {
        console.log('Personal Expenses Fetched!');
        setExpenseList(result.data)
        console.log(result.data);

      })
      .catch(error => {
        console.error('Error fetching Personal Expense List:', error);
      });

}, [expenseList]);


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
              <div className="banner-left col-sm-12">
                <div className='heading-dashboard'>Personal Expenses </div>
                
                  <div className='row'>
                    <div className='col-sm-4'>
                      Filters
                    </div>
                    <div className='col-sm-4'>
                      <select value={filterstatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option onClick={(e) => setFilterStatus(e.target.value)}>All</option>
                        <option onClick={(e) => setFilterStatus(e.target.value)}>Pending</option>
                        <option onClick={(e) => setFilterStatus(e.target.value)}>Accepted</option>
                        <option onClick={(e) => setFilterStatus(e.target.value)}>Rejected</option>
                      </select>
                    </div>
                    <div className='col-sm-4'>
                      <select value={filtertype} onChange={(e) => setFilterType(e.target.value)}>
                        <option onClick={(e) => setFilterType(e.target.value)}>All</option>
                        <option onClick={(e) => setFilterType(e.target.value)}>Travel</option>
                        <option onClick={(e) => setFilterType(e.target.value)}>Food</option>
                        <option onClick={(e) => setFilterType(e.target.value)}>Health/Medical</option>
                        <option onClick={(e) => setFilterType(e.target.value)}>Accessories</option>
                        <option onClick={(e) => setFilterType(e.target.value)}>Miscellanious</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {Array.isArray(expenseList) && expenseList.length > 0 ? (
                            expenseList.map((expenseList) => (
                            (filterstatus=='All' && filtertype=='All') ? 
                            <tr>
                              <td>{expenseList.type}</td>
                              <td>{expenseList.date.substring(0, expenseList.date.length - 17)}</td>
                              <td>{expenseList.description}</td>
                              <td>{expenseList.amount}</td>
                              <td>{expenseList.status}</td>
                              <td>
                                {
                                ((expenseList.status) != "Pending" ? <>NA</> : <span>
                                <a href={`${URL_PROD}/dashboard/personal/#editExpense`} onClick={(e) => setSelectedexpenseId(expenseList.expenseId)}><button className='button-banner-expense-list' style={{'borderColor' : 'green'}}><img src={EditIcon} className='banner-expense-list-icons'/></button></a><EditExpense expense={expenseList}/>
                                <a href="#" onClick={(e) => { setSelectedexpenseId(expenseList.expenseId); handleDelete(e);}}><button className='button-banner-expense-list' style={{'borderColor' : 'red'}}><img src={DeleteIcon} className='banner-expense-list-icons'/></button></a>
                                </span>
                                )}
                              </td>
                            </tr>
                            : 
                            ((expenseList.type)==filtertype && (expenseList.status)==filterstatus) ? (
                            <tr>
                            <td>{expenseList.type}</td>
                            <td>{expenseList.date.substring(0, expenseList.date.length - 17)}</td>
                            <td>{expenseList.description}</td>
                            <td>{expenseList.amount}</td>
                            <td>{expenseList.status}</td>
                            <td>
                              {
                              ((expenseList.status) != "Pending" ? <>NA</> : <span>
                              <a href={`${URL_PROD}/dashboard/personal/#editExpense`} onClick={(e) => setSelectedexpenseId(expenseList.expenseId)}><button className='button-banner-expense-list' style={{'borderColor' : 'green'}}><img src={EditIcon} className='banner-expense-list-icons'/></button></a><EditExpense expense={expenseList}/>
                              <a href="#" onClick={(e) => { setSelectedexpenseId(expenseList.expenseId); handleDelete(e);}}><button className='button-banner-expense-list' style={{'borderColor' : 'red'}}><img src={DeleteIcon} className='banner-expense-list-icons'/></button></a>
                              </span>
                              )}
                            </td>
                          </tr>)
                          : <></>
                          
                          ))) : <></> }
                  </table>
                </div>
              <div className='col-sm-2'>

              </div>
            </div>
        </div>
    </>
  )
};

export default DashboardBannerPersonal;

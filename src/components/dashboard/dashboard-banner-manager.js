import React, { useState, useEffect } from 'react';
import NavbarDashboard from "./navbar-dashboard-manager";
import '../../assets/css/dashboard.css';
import axios from 'axios'
import EditExpense from './editExpense';
import { Link, useNavigate } from 'react-router-dom';
import Tick from '../../assets/images/check.png';
import Wrong from '../../assets/images/close.png';


const DashboardBanner = () => {
  let URL_PROD = 'http://localhost:3000';
  const history = useNavigate(); 

  const [managerexpenseList, setManagerExpenseList] = useState([]);
  const [selectedexpenseId, setSelectedexpenseId] = useState();
  const [empName, setEmpName] = useState(JSON.parse(localStorage.getItem('data')).employeeName);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [filtertype, setFilterType] = useState('All');
  const [filterstatus, setFilterStatus] = useState('All');

const url_manager_get= `http://localhost:5206/Expenses/manager?name=${empName}`;
useEffect(() => {      
      axios.get(url_manager_get)
      .then(answer => {
        console.log('Team Expenses Fetched!');
        setManagerExpenseList(answer.data)
        console.log(managerexpenseList);

      })
      .catch(error => {
        console.error('Error fetching Team Expense List:', error);
      });
  }, [managerexpenseList]);

  const url_approve_reject = `http://localhost:5206/Expenses/status/?expenseId=${selectedexpenseId}&status=${selectedStatus}`

  const handleApprove =(e)=> {
    e.preventDefault();
    console.log(selectedexpenseId)

    axios.put(`http://localhost:5206/Expenses/status/?expenseId=${selectedexpenseId}&status=Accepted`)
    .then(response => {
      console.log(`${selectedStatus} Expense with ID ${selectedexpenseId}`);
    })
    .catch(error => {
      console.error(error);
    });
};

const handleReject =(e)=> {
  e.preventDefault();

  console.log(selectedexpenseId)

  axios.put(`http://localhost:5206/Expenses/status/?expenseId=${selectedexpenseId}&status=Rejected`)
  .then(response => {
    console.log(`${selectedStatus} Expense with ID ${selectedexpenseId}`);
  })
  .catch(error => {
    console.error(error);
  });
};


  return (
    <>
    <NavbarDashboard />
        <div className="banner-outer">
            <div className="banner row">
              <div className="banner-right col-sm-12">
                <div className='heading-dashboard'>Team Expenses</div>

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
                        <th scope="col">Expense Raiser</th>
                        <th scope="col">Category</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {Array.isArray(managerexpenseList) && managerexpenseList.length > 0 ? (
                            managerexpenseList.map((managerexpenseList) => (
                              (filterstatus=='All' && filtertype=='All') ? 

                              <tr>
                            <td>{managerexpenseList.employeeName}</td>
                            <td>{managerexpenseList.type}</td>
                            <td>{managerexpenseList.date.substring(0, managerexpenseList.date.length - 17)}</td>
                            <td>{managerexpenseList.description}</td>
                            <td>{managerexpenseList.amount}</td>
                            <td>{managerexpenseList.status}</td>
                            <td>
                              { ((managerexpenseList.status) != "Pending" ? <>NA</> : <span>
                              <a onClick={(e) => { setSelectedexpenseId(managerexpenseList.expenseId); handleApprove(e);}}><button className='button-banner-expense-list' style={{'borderColor' : 'green'}}><img src={Tick} className='banner-expense-list-icons'/></button></a>
                              <a onClick={(e) => { setSelectedexpenseId(managerexpenseList.expenseId); setSelectedStatus('Rejected'); handleReject(e);}}><button className='button-banner-expense-list' style={{'borderColor' : 'red'}}><img src={Wrong} className='banner-expense-list-icons'/></button></a>
                              </span>
                              )}
                              </td>
                          </tr>
                          :
                            ((managerexpenseList.type)==filtertype && (managerexpenseList.status)==filterstatus) ? (
                            <tr>
                            <td>{managerexpenseList.employeeName}</td>
                            <td>{managerexpenseList.type}</td>
                            <td>{managerexpenseList.date.substring(0, managerexpenseList.date.length - 17)}</td>
                            <td>{managerexpenseList.description}</td>
                            <td>{managerexpenseList.amount}</td>
                            <td>{managerexpenseList.status}</td>
                            <td>
                              { ((managerexpenseList.status) != "Pending" ? <>NA</> : <span>
                              <a onClick={(e) => { setSelectedexpenseId(managerexpenseList.expenseId); handleApprove(e);}}><button className='button-banner-expense-list' style={{'borderColor' : 'green'}}><img src={Tick} className='banner-expense-list-icons'/></button></a>
                              <a onClick={(e) => { setSelectedexpenseId(managerexpenseList.expenseId); setSelectedStatus('Rejected'); handleReject(e);}}><button className='button-banner-expense-list' style={{'borderColor' : 'red'}}><img src={Wrong} className='banner-expense-list-icons'/></button></a>
                              </span>
                              )}
                              </td>
                          </tr>)
                          : <></>
                          ))) : <></> }
                  </table>
                </div>
            </div>
        </div>
    </>
  )
};

export default DashboardBanner;

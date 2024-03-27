import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../assets/images/Loader123.gif';
import Swal from 'sweetalert2';

const EditExpense = () => {
  const [empName, setEmpName] = useState();
  const [type, setType] = useState();
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [managerName, setManagerName] = useState('');
  const [status, setStatus] = useState('');

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
        employeeName: empName,
        type: type,
        description:details,
        amount:amount,
        managerName:managerName,
        status:'Pending'
      };

  };

  return (
    <>
      <div id="editExpense" className="modal-window modal-window-register">
        <div>
          <a href="#" title="Close" className="modal-close">
            X
          </a>
          <h1>Edit Expense</h1>
          <form onSubmit={handleFormSubmit}>

            <div className='row'>
              <div className="form-group col-sm-12">
                <label htmlFor="Type">Type</label>
                <select>
                  <option>Travel</option>
                  <option>Food</option>
                  <option>Health/Medical</option>
                  <option>Accessories</option>
                  <option>Miscellanious</option>
                </select>
              </div>
            </div>


            <div className='row'>
              <div className="form-group col-sm-6">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number" 
                  name="amount"
                  autoComplete="off"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="managerName">Manager Name</label>
                <input
                  type="text" 
                  name="managerName"
                  autoComplete="off"
                  required
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                />
              </div>
            </div>
            
            
            <div className='row'>
              <div  className='form-group col-sm-12'>
                <label htmlFor="details">Description</label>
                <textarea placeholder="Describe your expense!" value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
              </div>
            </div>

            <div className="btn-sbmt-cont">
              <button type="submit" value="Save as draft!" className="btn-sbmt" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <img src={Loader} className="loginbtn-loader" alt="Loader" /> Saving...
                  </>
                ) : (
                  'Save as draft!'
                )}
              </button> &nbsp;&nbsp;
              <button type="submit" value="Submit" className="btn-sbmt" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <img src={Loader} className="loginbtn-loader" alt="Loader" /> Submitting...
                  </>
                ) : (
                  'Submit'
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

export default EditExpense;
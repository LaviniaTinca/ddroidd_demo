import React, { Fragment } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './success.css'


const SuccessPage = () => {
    const { state } = useLocation();
    const selectedData = state.selectedData || {};
  return (
    <Fragment>
        <div className="rectangle3">
            <h1 className='success'>Excellent!</h1>
            <h1 className='success'> See you in November 2023!</h1>
            <p>Submission summary:</p>
            <div className="submission-summary">
            <p>Name: {selectedData.name}</p>
      <p>Email: {selectedData.email}</p>
      <p>Address: {selectedData.address}</p>
      <p>Selected Country: {selectedData.country}</p>
      <p>Selected City: {selectedData.city}</p>
            </div>
        </div>
        <Outlet/>
    </Fragment>
  )
}

export default SuccessPage
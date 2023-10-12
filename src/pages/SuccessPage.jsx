import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

const SuccessPage = () => {
    const { state } = useLocation();
    const selectedData = state.selectedData || {};
  return (
    <Fragment>
        <div className="main-container">
          <div className="flexVertical">
          <h1 className='success'>Excellent!</h1>
            <h1 className='success'> See you in November 2023!</h1>
          </div>
            <p>Submission summary:</p>
            <div className="submission-summary">
            <p>First Name: {selectedData.firstName}</p>
            <p>Last Name: {selectedData.lastName}</p>
            <p>Phone Number: {selectedData.phoneNumber}</p>
            <p>Email: {selectedData.email}</p>
            <p>Address: {`${selectedData.address1 }, ${selectedData.address2}`}</p>
            <p>Country: {selectedData.country}</p>
            <p>State: {selectedData.state}</p>
            <p>City: {selectedData.city}</p>
            </div>
        </div>
    </Fragment>
  )
}

export default SuccessPage
import React, { Fragment } from 'react'
import Typography from '@mui/material/Typography';  

const SubmissionPage = ({selectedData}) => {

  return (
    <Fragment>
        <div className="main-container">
        
            <Typography variant="submissionVariant1" color="primary.main">
                Excellent!                   
            </Typography>
            <Typography variant="submissionVariant1" color="primary.main">
                See you in November 2023!                   
            </Typography>

          <div className="submission">
            <Typography variant="submissionVariant2" color="primary.submission">
              Submission summary:                   
            </Typography>
          </div>

          <div className="submission-summary">
            <Typography variant="submissionVariant2" color="primary.submission">
              First Name: {selectedData.firstName}                 
            </Typography>
            <Typography variant="submissionVariant2" color="primary.submission">
              Last Name: {selectedData.lastName}                 
            </Typography>
            <Typography variant="submissionVariant2" color="primary.submission">
              Phone Number: {selectedData.phoneNumber}                 
            </Typography>
            <Typography variant="submissionVariant2" color="primary.submission">
              Email: {selectedData.email}                 
            </Typography>
            <Typography variant="submissionVariant2" color="primary.submission">
              Address: {`${selectedData.address1 }, ${selectedData.address2}`}                 
            </Typography>
            <Typography variant="submissionVariant2" color="primary.submission">
              Country: {selectedData.country}                 
            </Typography>
            <Typography variant="submissionVariant2" color="primary.submission">
              State: {selectedData.state}                 
            </Typography>
            <Typography variant="submissionVariant2" color="primary.submission">
              City: {selectedData.city}                 
            </Typography>
          </div>
        </div>
    </Fragment>
  )
}

export default SubmissionPage 
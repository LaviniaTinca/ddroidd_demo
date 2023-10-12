import React, { Fragment } from 'react'
import Typography from '@mui/material/Typography';  

const Footer = () => {
  return (
    <Fragment>
        <div className="footer">
            <Typography variant="footerVariant" className="footer-title">
              Come to the dark side... we have
            </Typography>
            <img src="/cookies.png" alt="cookie" />
        </div>

    </Fragment>
  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';  


const JoinUsButton = ({ isHomePage }) =>  (
    <Link  to='/join' >
    <button className={isHomePage ? 'home-page-btn' : ''}>
        <Typography variant="buttonVariant" className='submission'>
           Join Us
        </Typography>
    </button>
    </Link> 
 )



export default JoinUsButton
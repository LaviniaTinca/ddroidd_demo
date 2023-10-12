import React from 'react'
import { Link } from 'react-router-dom'

const JoinUsButton = ({ isHomePage }) =>  (
    <Link  to='/join' >
    <button className={isHomePage ? 'home-page-btn' : ''}>Join Us</button>
    </Link> 
 )



export default JoinUsButton
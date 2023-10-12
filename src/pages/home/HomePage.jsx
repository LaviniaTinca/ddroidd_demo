import React, { Fragment } from 'react'
import { ReactComponent as HomeImage1 } from '../../assets/img/destructuring.svg'
import { ReactComponent as HomeImage2 } from '../../assets/img/WebPage_logo.svg'
import { Link, Outlet } from 'react-router-dom'
import './home.css';

const HomePage = () => {
  return (
    <Fragment>
        <div className='rectangle3'>
          <div className='home-images'>
          <HomeImage1 className='home-image1' />
          <HomeImage2 className='home-image2' />
          </div>
          <Link  to='/join' >
          <button className='home-page-btn'>Join Us</button>
          </Link>
        </div>
        <Outlet />
    </Fragment>
  )
}

export default HomePage
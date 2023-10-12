import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import './navigation.css';

const Navigation = () => {

  // const navigate = useNavigate()
  // const isHomePage = navigate().location.pathname === '/'
  const isHomePage = true
  return (
    <Fragment>
      <div className='navigation'>
        <Header showRightLink={isHomePage}/>
      </div>
      <Outlet />
      <Footer/>
    </Fragment>
  )
}

export default Navigation
import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import './navigation.css';

const Layout = () => {

  // const navigate = useNavigate()
  const isHomePage = window.location.pathname === '/'
  console.log(isHomePage)

  // const isHomePage = true
  return (
    <Fragment>
      <div className='navigation'>
        <Header 
        showJoinUsButton={isHomePage}
        />

      </div>
      <Outlet />
      <Footer/>
    </Fragment>
  )
}

export default Layout
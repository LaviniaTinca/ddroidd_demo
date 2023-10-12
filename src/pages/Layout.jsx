import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/styles.css';

const Layout = () => {

  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer/>
    </Fragment>
  )
}

export default Layout
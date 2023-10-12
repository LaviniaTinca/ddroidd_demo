import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
// import ApplicationForm from '../components/applicationForm/ApplicationForm'
import MyForm from '../../components/applicationForm/MyForm2'

const JoinPage = () => {
  return (
    <Fragment>
        <div className='rectangle3'>
          <MyForm/>
        </div>
        <Outlet/>
    </Fragment>

  )
}

export default JoinPage
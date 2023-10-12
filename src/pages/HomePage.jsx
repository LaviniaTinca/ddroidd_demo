import React, { Fragment } from 'react'
import { ReactComponent as HomeImage1 } from '../assets/img/destructuring.svg'
import { ReactComponent as HomeImage2 } from '../assets/img/WebPage_logo.svg'
import JoinUsButton from '../components/JoinUsButton'

const HomePage = () => {
  return (
    <Fragment>
        <div className='main-container'>
          <div className='home-images'>
          <HomeImage1 className='home-image1' />
          <HomeImage2 className='home-image2' />
          </div>
          <JoinUsButton isHomePage = {true} />
        </div>
    </Fragment>
  )
}

export default HomePage
import React, { Fragment } from 'react'
import { ReactComponent as Logo } from '../assets/img/ddroidd_logo.svg'
import { Link } from 'react-router-dom'
import '../pages/navigation/navigation.css';


const Header = ({showRightLink}) => {

  return (
    <Fragment>
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div>
                <h1 className='title'>Autumn - Winter Bootcamp</h1>
            </div>
            {showRightLink && (
                <Link  to='/join' className='right-link'>
                    <button >Join Us</button>
                </Link>
            )}
        </div>
      
    </Fragment>
  )
}

export default Header
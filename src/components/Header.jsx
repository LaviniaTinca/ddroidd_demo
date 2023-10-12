import React, { Fragment } from 'react'
import { ReactComponent as Logo } from '../assets/img/ddroidd_logo.svg'
import { Link, useLocation } from 'react-router-dom'
import JoinUsButton from './JoinUsButton';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <Fragment>
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
                <h1 className='title'>Autumn - Winter Bootcamp</h1>
            {isHomePage && <JoinUsButton />}
        </div>
    </Fragment>
  );
}

export default Header;

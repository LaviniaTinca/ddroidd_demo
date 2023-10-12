import React, { Fragment } from 'react'
import { ReactComponent as Logo } from '../assets/img/ddroidd_logo.svg'
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography'; 
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
                <Typography variant="headerVariant" className='title'>
                    Autumn - Winter Bootcamp
                </Typography>
            {isHomePage && <JoinUsButton />}
        </div>
    </Fragment>
  );
}

export default Header;

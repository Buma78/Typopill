import React from 'react';
import Accounticon from './Accounticon';

const Header = () => {
  return (
    <div className='header'>
        <div className='logo'>
             Logo
        </div>
        <div className='icons'>
             <Accounticon/>
        </div>
    </div>
  )
}

export default Header;
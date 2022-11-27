import React from 'react';
import Accounticon from './Accounticon';
import CompareButton from './CompareButton';

const Header = () => {
  return (
    <div className='header'>
        <div className='logo' style={{display:'flex'}}>
             <span style={{display:'block',marginRight:'6px'}}>Logo</span>
             <CompareButton/>
        </div>
        <div className='icons'>
             <Accounticon/>
        </div>
    </div>
  )
}

export default Header;
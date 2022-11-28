import React from 'react';
import Accounticon from './Accounticon';
import CompareButton from './CompareButton';
import KeyboardIcon from '@mui/icons-material/Keyboard';
const Header = () => {
  return (
    <div className='header'>
        <div className='logo' style={{display:'flex'}}>
             <span style={{display:'block',marginRight:'6px'}}><KeyboardIcon/></span>
             <CompareButton/>
        </div>
        <div style={{cursor:"pointer"}}>
             <Accounticon />
        </div>
    </div>
  )
}

export default Header;
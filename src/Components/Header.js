import React from 'react';
import Accounticon from './Accounticon';
import CompareButton from './CompareButton';
import KeyboardIcon from '@mui/icons-material/Keyboard';
const Header = () => {
  return (
    <div className='header'>
        <div className='logo' style={{display:'flex'}}>
             <CompareButton/>
        </div>
        <div className='logo'>
          <h2 style={{marginRight:'6px'}}>
         <KeyboardIcon/>
         </h2>
           <h2>Typopill</h2>
        </div>
        <div style={{cursor:"pointer"}}>
             <Accounticon />
        </div>
    </div>
  )
}

export default Header;
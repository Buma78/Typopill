import React from 'react';
import Select from 'react-select';
import { useTheme } from '../Contexts/ThemeContext';
import { themeOptions } from '../Styles/Theme';

const Footer = () => {
    const {setTheme} = useTheme();

    const handleThemeChange =(e)=> {
        setTheme(e.value);
    }
  return (
    <div className='footer'>
        <div className='footer-links'>
            link
        </div>
        <div className='footer-links'>
           <Select
                options = {themeOptions}
                menuPlacement="top"
                onChange={handleThemeChange}
           />
        </div>
    </div>
  )
}

export default Footer;
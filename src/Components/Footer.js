import React from 'react';
import Select from 'react-select';
import { useTheme } from '../Contexts/ThemeContext';
import { themeOptions } from '../Styles/Theme';

const Footer = () => {
    const {setTheme,Theme,defaultTheme} = useTheme();

    const handleThemeChange =(e)=> {
        setTheme(e.value);
        localStorage.setItem('theme',JSON.stringify(e.value));
    }
  return (
    <div className='footer'>
        <div className='instructions'>
            <div className='hint'>
                press <kbd>Tab</kbd> to open command
            </div>
        </div>
        <div className='actual-footer'>
        <div className='footer-links'>
            link
        </div>
        <div className='footer-links'>
           <Select
                options = {themeOptions}
                menuPlacement="top"
                onChange={handleThemeChange}
                defaultValue={{value:defaultTheme,label:defaultTheme.label}}
                styles={{
                    control:(styles)=>({...styles,backgroundColor:Theme.background}),
                    menu:(styles)=>({...styles,backgroundColor:Theme.background})
                }}
           />
        </div>
        </div>
    </div>
  )
}

export default Footer;
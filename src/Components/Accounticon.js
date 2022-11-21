import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, makeStyles, Modal, Tab, Tabs } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
const useStyle = makeStyles(()=>({
    modal:{
        display: 'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    box:{
        width : 400
    }
}))
const Accounticon = () => {
    const [open,setOpen] = useState(false);
    const[value,setValue] = useState(0);
    const handleValueChange = (e,v)=>{
        setValue(v);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    const navigate = useNavigate();

    const logout=()=>{
        auth.signOut().then((ok)=>{
            alert("logged out");
        }).catch((err)=>{
            alert("not able to logout");
        })
    }

    const handleAccountIconClick=()=>{
        if(user){
            navigate('/user');
        }
        else{
            setOpen(true);
        }
    }

    const classes = useStyle();

    const [user] = useAuthState(auth);
  return (
    <div>
        <AccountCircleIcon onClick={handleAccountIconClick}/>
        {(user)&&<LogoutIcon onClick={logout} style={{marginLeft:'5px'}}/>}
        <Modal 
             open={open}
             onClose={handleClose}
             className={classes.modal}
             >
         <div className={classes.box}>
         <AppBar position='static'
          style={{backgroundColor:'transparent',color:'white'}}>
            <Tabs value={value} onChange={handleValueChange} variant='fullWidth'>
                <Tab label='login'></Tab>
                <Tab label='signup'></Tab>
            </Tabs>
         </AppBar>
         {value===0 && <LoginForm handleClose={handleClose}/>}
         {value===1 && <SignupForm handleClose={handleClose}/>}
          </div>


        </Modal>
    </div>
  )
}

export default Accounticon;
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, makeStyles, Modal, Tab, Tabs } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../Contexts/AlertContext';
import GoogleButton from 'react-google-button';
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
const useStyle = makeStyles(()=>({
    modal:{
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        backdropFilter:"blur(1.5px)"
    },
    box:{
        width : 400,
        textAlign : "Center",
        border: "1px solid"
    }
}))
const Accounticon = () => {
    const [open,setOpen] = useState(false);
    const[value,setValue] = useState(0);
    const {setAlert} = useAlert();
    const handleValueChange = (e,v)=>{
        setValue(v);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    const navigate = useNavigate();

    const logout=()=>{
        auth.signOut().then((ok)=>{
            setAlert({
                open:true,
                type:"success",
                message:"Logged out"
            })
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
    
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle =()=>{
        signInWithPopup(auth,googleProvider).then((res)=>{
            setAlert({
                open : true,
                type : "success",
                message: "Looged in"
            });
            handleClose();
        }).catch((err)=>{
            setAlert({
                open : true,
                type :"error",
                message : "not able to use Google Authentication"
            })
        })

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

          <Box className={classes.Box}>
            <span style={{display:'block',padding:'1rem'}}>OR</span>
            <GoogleButton style={{width:'100%'}} onClick={signInWithGoogle}/>
          </Box>
          </div>

        </Modal>
    </div>
  )
}

export default Accounticon;
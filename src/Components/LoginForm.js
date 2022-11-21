import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { auth } from '../FirebaseConfig';

const LoginForm = ({handleClose}) => {
    const[email,setEmail] = useState("");
    const[password, setPassword] = useState("");
    const handlesubmit =()=> {
        if(!email || !password){
            alert("enter all details");
            return;
        }
        auth.signInWithEmailAndPassword(email,password).then((ok)=>{
            alert("logged in");
            handleClose();
        }).catch((err)=>{
            alert('not able to login');
            console.log(err);
        });
    }
  return (
    <Box
    p={3}
    style={{
        display :'flex',
        flexDirection:'column',
        gap:'20px',
        backgroundColor:'white',
        padding:10
    }} >
        <TextField
        variant='outlined'
        type = 'email'
        label = 'Enter Email'
        onChange={(e)=>{
            setEmail(e.target.value)
        }}>

        </TextField>
        <TextField
         variant='outlined'
         type = 'password'
         label = 'Enter Password'
         onChange={(e)=>{
            setPassword(e.target.value)
         }}>
            
         </TextField>
         <Button
         variant='contained'
         size='large'
         style={{backgroundColor:'red'}}
         onClick={handlesubmit}
         >
            Login
         </Button>
    </Box>
  )
}

export default LoginForm;
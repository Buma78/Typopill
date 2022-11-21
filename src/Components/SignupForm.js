import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { auth } from '../FirebaseConfig';

const SignupForm = ({handleClose}) => {
    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const handleSignUp =()=>{
        if(!email || !password || !confirmPassword){
            alert('enter all detailes');
            return;
        }
        if(password!== confirmPassword){
            alert('password missmatch');
            return;
        }
        auth.createUserWithEmailAndPassword(email,password).then((ok)=>{
            alert("user created");
            handleClose();
        }).catch((err)=>{
            alert('not able to create account');
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
         <TextField
         variant='outlined'
         type = 'password'
         label = 'confirm Password'
         onChange={(e)=>{
            setConfirmPassword(e.target.value)
        }}>
            
         </TextField>
         <Button
         variant='contained'
         size='large'
         style={{backgroundColor:'red'}}
         onClick={handleSignUp}>
            SignUp
         </Button>
    </Box>
  )
}

export default SignupForm;
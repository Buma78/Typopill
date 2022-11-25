import { Box, Button, TextField } from '@material-ui/core';
import React, {useState } from 'react'
import { useAlert } from '../Contexts/AlertContext';
import { useTheme } from '../Contexts/ThemeContext';
import { auth, db } from '../FirebaseConfig';
import ErrorMapping from '../Utils/ErrorMessages';

const SignupForm = ({handleClose}) => {
    const[userName,setUserName] = useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const {setAlert} = useAlert();
     const {Theme}= useTheme();

     const checkUserNameAvailability= async()=>{
           const ref = db.collection('usernames').doc(`${userName}`);
           const response = await ref.get();
           return !response.exists;
     }

    const handleSignUp =async()=>{
        if(!email || !password || !confirmPassword){
            setAlert({
                open:true,
                type:"warning",
                message:"please enter all detailes"
            })
            return;
        }
        if(password!== confirmPassword){
            setAlert({
                open:true,
                type:"warning",
                message:"password mismatch"
            })
            return;
        }
        if(await checkUserNameAvailability()){
            auth.createUserWithEmailAndPassword(email,password).then(async(res)=>{
                await db.collection('usernames').doc(`${userName}`).set({
                    uid : res.user.uid
                }).then((reponse)=>{
                    setAlert({
                        open:true,
                        type:"success",
                        message:"Account created"
                    })
                    handleClose();
                });
            }).catch((err)=>{
                setAlert({
                    open : true,
                    type : 'error',
                    message : ErrorMapping[err.code] || "some error ocurred"
                })
            });
        }else{
            setAlert({
                open : true,
                type : 'error',
                message : "username already exist"
            })
        }
    }
  return (
    <Box
    p={3}
    style={{
        display :'flex',
        flexDirection:'column',
        gap:'20px',
        backgroundColor:'transparent',
        padding:10
    }} >

       <TextField
        variant='outlined'
        type = 'username'
        label = 'Enter username'
        InputLabelProps={{
            style:{
                color:Theme.title
            }
        }}
        InputProps={{
            style:{
                color:Theme.title
            }
        }}
        onChange={(e)=>{
            setUserName(e.target.value)
        }}>

        </TextField>

        <TextField
        variant='outlined'
        type = 'email'
        label = 'Enter email'
        InputLabelProps={{
            style:{
                color:Theme.title
            }
        }}
        InputProps={{
            style:{
                color:Theme.title
            }
        }}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}>

        </TextField>
        <TextField
         variant='outlined'
         type = 'password'
         label = 'Enter password'
         InputLabelProps={{
            style:{
                color:Theme.title
            }
        }}
        InputProps={{
            style:{
                color:Theme.title
            }
        }}
         onChange={(e)=>{
            setPassword(e.target.value)
        }}>
            
         </TextField>
         <TextField
         variant='outlined'
         type = 'password'
         label = 'confirm password'
         InputLabelProps={{
            style:{
                color:Theme.title
            }
        }}
        InputProps={{
            style:{
                color:Theme.title
            }
        }}
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
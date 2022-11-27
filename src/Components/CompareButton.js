import { Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import { useTheme } from '../Contexts/ThemeContext';
import { useAlert } from '../Contexts/AlertContext';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const useStyles = makeStyles(()=>({
    modal : {
        display :"flex",
        alignItems:"center",
        justifyContent:'center',
        backdropFilter:"blur(2px)",
        },
    compareBox:{
        width : 'auto',
        padding:'1rem',
        border:'1px solid'
    }
}));

const CompareButton = () => {
    const [open,setOpen]  = useState(false);
    const [userName,setUserName]  = useState('');
    const {setAlert} = useAlert();

    const navigate = useNavigate();

    const[user] = useAuthState(auth);
    const handleModal=()=>{
        if(user){
            setOpen(true);
        }
        else{
            setAlert({
                open:true,
                type:'warning',
                message:"login to compare"
            })
        }
    }

    const handleClose=()=>{
        setOpen(false);
    }
     
    const checkUserNameAvailability= async()=>{
        const ref = db.collection('usernames').doc(`${userName}`);
        const response = await ref.get();
        if(response.exists){
            if(user.uid===response.data().uid){
                return false;
            }
        }
        return response.exists;
  }
    const handleSubmit =async()=>{
         if(await checkUserNameAvailability()){
            navigate(`/compare/${userName}`);
         }
         else{
            setAlert({
                open:true,
                type:'warning',
                message:"invalid username"
            })
         }
    }

    const classes = useStyles();
    const {Theme} = useTheme();
  return (
   <div>
     <div className='compare-btn' style={{cursor:'pointer',color:Theme.background,backgroundColor:Theme.title,borderRadius:'3px'}} onClick={handleModal}>
          COMPARE
    </div>
    <Modal
       open={open}
       onClose={handleClose}
       className={classes.modal}>
        <div className={classes.compareBox}>
            <TextField 
            type='text'
            label="Enter username"
            variant ='outlined'
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
        onChange={(e)=>setUserName(e.target.value)}/>
            <Button onClick={handleSubmit} style={{backgroundColor:Theme.title,color:Theme.background,marginLeft:'5px',marginTop:'10px'}}>Compare</Button>
        </div>
    </Modal>
   </div>
  )
}

export default CompareButton ;
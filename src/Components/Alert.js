import { Slide, Snackbar,Alert } from '@mui/material';
import React from 'react'
import { useAlert } from '../Contexts/AlertContext';

const Alerts = () => {
    const {alert,setAlert} = useAlert();
    const handleClose = (event,reason)=>{
          if(reason ==='clickaway'){
            return;
          }
          setAlert({
            open: false,
            meassage: "",
            type : ""
           })
    }
  return (
    <div>
        <Snackbar open={alert.open}
            autoHideDuration={3000}
            anchorOrigin={{
                vertical:"top",
                horizontal:'left'
            }}
            onClose={handleClose}>
             <Slide in ={alert.open}>
                <Alert severity={alert.type} onClose={handleClose}>
                   {alert.message}
                </Alert>
             </Slide>
        </Snackbar> 
   </div>
  )
}

export default Alerts;
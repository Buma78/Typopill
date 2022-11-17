import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, makeStyles, Modal, Tab, Tabs } from '@material-ui/core';

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
    const classes = useStyle();
  return (
    <div>
        <AccountCircleIcon onClick={()=>setOpen(true)}/>
        <Modal 
             open={open}
             onClose={handleClose}
             className={classes.modal}
             >
         <div className={classes.box}>
         <AppBar position='static'>
            <Tabs value={value} onChange={handleValueChange} variant='fullWidth'>
                <Tab label='login'></Tab>
                <Tab label='signup'></Tab>
            </Tabs>
         </AppBar>
         {value===0 && <h1>login Component</h1>}
         {value===1 && <h1>sign up Component</h1>}
          </div>


        </Modal>
    </div>
  )
}

export default Accounticon;
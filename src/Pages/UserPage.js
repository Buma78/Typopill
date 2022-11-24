import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import Graph from '../Components/Graph';
import { useTheme } from '../Contexts/ThemeContext';
import { auth, db } from '../FirebaseConfig';

const UserPage = () => {
   const [data,setData] = useState([]);
   const [graphData,setGraphData] = useState([]);
   const {Theme} = useTheme();
   const [user,loading] = useAuthState(auth);
  const fetchUserData = ()=>{
       const resultsRef = db.collection('Results');
       const tempData = [];
       const tempGraphData = [];
       const {uid} = auth.currentUser;
       resultsRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
             snapshot.docs.forEach((doc)=>{
              tempData.push({...doc.data()})
              tempGraphData.push([doc.data().timeStamp,doc.data().wpm])
             })
             setData(tempData);
             setGraphData(tempGraphData);
       })
  }
    
    useEffect(()=>{
      if(!loading){
      fetchUserData();
      }
    },[loading]);

    if (loading){
      return (
        <h1 style={{textAlign :'center'}}><CircularProgress size={50}/></h1>
      )
    }
  return (
    <div className='canvas'>

      <div className='user-profile'>
        <div className='user'>
           <div className='picture'>
                 <AccountCircle style={{display:'block', transform:'scale(6)', margin:'auto', marginTop: '3.5rem'}}/>
           </div>
           <div className='info'>
               <div className='email'>
                     {user.email}
               </div>
               <div className='joined-on'>
                     {user.metadata.creationTime}
               </div>
           </div>
        </div>
      <div className='total-times'>
            <span>
              Total Test Taken - {data.length}
            </span>
      </div>
      </div>
    <div className='result-graph'>
    <Graph graphData ={graphData} type="date"/>
    </div>
       <div className='table'>
           <TableContainer style={{maxHeight:'30rem'}}>
              <Table>
                <TableHead>
                    <TableRow>
                    <TableCell style={{color:Theme.title,textAlign:'center'}}>
                        Wpm
                    </TableCell>

                    <TableCell style={{color:Theme.title,textAlign:'center'}}>
                        Accuracy
                    </TableCell>

                    <TableCell style={{color:Theme.title,textAlign:'center'}}>
                        Characters
                    </TableCell>

                    <TableCell style={{color:Theme.title,textAlign:'center'}}>
                        date
                    </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(i=>(
                      <TableRow>
                      <TableCell style={{color:Theme.title,textAlign:'center'}}>
                        {i.wpm}
                     </TableCell>

                    <TableCell style={{color:Theme.title,textAlign:'center'}}>
                        {i.accuracy}
                    </TableCell>

                    <TableCell style={{color:Theme.title,textAlign:'center'}}>
                        {i.characters}
                    </TableCell>

                    <TableCell style={{color:Theme.title,textAlign:'center'}}>
                        {i.timeStamp.toDate().toString()}
                    </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
           </TableContainer>
       </div>
    </div>
  )
}

export default UserPage;
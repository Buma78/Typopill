import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import Graph from '../Components/Graph';
import { auth, db } from '../FirebaseConfig';

const UserPage = () => {
   const [data,setData] = useState([]);
   const [graphData,setGraphData] = useState([])
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
     <Graph graphData ={graphData} type="date"/>
       <div className='table'>
           <TableContainer>
              <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>
                        Wpm
                    </TableCell>

                    <TableCell>
                        Accuracy
                    </TableCell>

                    <TableCell>
                        Characters
                    </TableCell>

                    <TableCell>
                        date
                    </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(i=>(
                      <TableRow>
                      <TableCell>
                        {i.wpm}
                     </TableCell>

                    <TableCell>
                        {i.accuracy}
                    </TableCell>

                    <TableCell>
                        {i.characters}
                    </TableCell>

                    <TableCell>
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
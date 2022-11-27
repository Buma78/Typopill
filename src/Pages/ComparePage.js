import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Graph from '../Components/Graph';
import { auth, db } from '../FirebaseConfig';

const ComparePage = () => {
    const {username} = useParams();
    const [loggedInUserData,setLoggedInUserData]= useState([]);
    const [compareUserData,setCompareUserData] = useState([]);
    const [loggedInUserGraphData,setLoggedInUserGraphData]= useState([]);
    const [compareUserGraphData,setCompareUserGraphData] = useState([]);
   
    const getUid = async()=>{
        const ref = db.collection('usernames').doc(`${username}`);
        const response = await ref.get();
        return response.data().uid;
    }
    

   const getData =async()=>{
       const userUId = await getUid();
       const {uid} = auth.currentUser;
    
       const resultsRef = db.collection('Results');
       const tempData = [];
       const tempGraphData = [];
       resultsRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
             snapshot.docs.forEach((doc)=>{
              tempData.push({...doc.data()})
              tempGraphData.push([doc.data().timeStamp,doc.data().wpm])
              setLoggedInUserData(tempData);
              setLoggedInUserGraphData(tempGraphData);
             })
       });

       const tempData1 = [];
       const tempGraphData1 = [];
       resultsRef.where('userId','==',userUId).orderBy('timeStamp','desc').get().then((snapshot)=>{
             snapshot.docs.forEach((doc)=>{
              tempData1.push({...doc.data()})
              tempGraphData1.push([doc.data().timeStamp,doc.data().wpm])
              setCompareUserData(tempData1);
              setCompareUserGraphData(tempGraphData1);
             })
       });
   }
     useEffect(()=>{
        getData();
     },[])
  return (
    <div>
        <Graph graphData={loggedInUserGraphData}/>
        <Graph graphData={compareUserGraphData}/>
    </div>
  )
}

export default ComparePage;
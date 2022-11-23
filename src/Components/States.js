import React, { useEffect } from 'react'
import { auth, db } from '../FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import Graph from './Graph';
import { useAlert } from '../Contexts/AlertContext';

const Stats = ({wpm,accuracy,graphData,correctChars,incorrectChars,extraChars,missedChars}) => {
   
  var timeSet = new Set();
  const newGraph = graphData.filter((i)=>{
  return (!timeSet.has(i[0])) ? timeSet.add(i[0]): ""
    }
  )

  const [user] = useAuthState(auth);
  const {setAlert} = useAlert();

  const pushResultsTodb = async()=>{
    const resultsRef = db.collection('Results');
    const {uid} = auth.currentUser;
    if(!isNaN(accuracy)){
      await resultsRef.add({
        userId : uid,
        wpm : wpm,
        accuracy: accuracy,
        characters :`${correctChars}/${incorrectChars}/${extraChars}/${missedChars}`,
        timeStamp : new Date()
      }).then((res)=>{
        setAlert({
          open : true,
          type : "success",
          message : "result saved to db"
        });
      })
    }else{
      setAlert({
        open : true,
        type : "error",
        message : "invalid test"
      })
    }
  } 
     useEffect(()=>{
      if(user){
        pushResultsTodb();
      }else{
        setAlert({
          open : true,
          type : "warning",
          message : "Login to save result"
        })
      }
     },[]);
  return (
    <div className='stats-box'>
        <div className='left-stats'>
          <div className='title'>wpm</div>
          <div className='subtitle'>{wpm}</div>
          <div className='title'>accuracy</div>
          <div className='subtitle'>{accuracy}</div>
          <div className='title'>Characters</div>
          <div className='subtitle'>{correctChars}/{incorrectChars}/{extraChars}/{missedChars}</div>
        </div>
        <div className='right-stats'>
            <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats;
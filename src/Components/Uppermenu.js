import React from 'react'
import { useTestMode } from '../Contexts/TestMode';

const Uppermenu = ({countDown}) => {

    const {setTestTime,setTestWord,setTestMode,testMode} = useTestMode();

    const updateTime = (e)=>{
       setTestTime(e.target.id);
    }

    const updateWord = (e)=>{
      setTestWord(Number(e.target.id));
   }
   const updateMode = (e)=>{
      setTestMode(e.target.id);
   }
  return (
    <div className='upper-menu'>
       <div className='counter'>{countDown}</div>
       <div className='modes'>
         <span className='mode' id='time-mode' onClick={(e)=>updateMode(e)} style={{paddingRight:'10px'}}>Time</span>
         <span className='mode' id='word-mode' onClick={(e)=>updateMode(e)}>Words</span>
       </div>
       {testMode==='time-mode'?(<div className='timer-modes'>

          <div className='time' id={15} onClick={(e)=>updateTime(e)}>15s</div>
          <div className='time' id={30} onClick={(e)=>updateTime(e)}>30s</div>
          <div className='time' id={60} onClick={(e)=>updateTime(e)}>60s</div>

       </div>):(<div className='word-modes'>

          <div className='no-of-word' id={10} onClick={(e)=>updateWord(e)}>10</div>
          <div className='no-of-word' id={20} onClick={(e)=>updateWord(e)}>20</div>
          <div className='no-of-word' id={30} onClick={(e)=>updateWord(e)}>30</div>

       </div>)}
    </div>
  )
}

export default Uppermenu;
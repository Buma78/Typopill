import React from 'react'
import Graph from './Graph';

const Stats = ({wpm,accuracy,graphData,correctChars,incorrectChars,extraChars,missedChars}) => {
   
  var timeSet = new Set();
  const newGraph = graphData.filter((i)=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  })
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
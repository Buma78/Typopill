import React, { useContext, useState } from 'react'

const TimersContext = React.createContext();
export const TimerContextprovider = ({children}) => {
    const[testTime,setTestTime] = useState(15);
       const values={
          testTime,
          setTestTime
       }
   
  return (
    <TimersContext.Provider value = {values}>
    {children}
    </TimersContext.Provider>
  )
}
 export const useTestMode =()=> useContext(TimersContext);
import React, { useContext, useState } from 'react'

const TestModeContext = React.createContext();
export const TestModeContextprovider = ({children}) => {
    const[testTime,setTestTime] = useState(15);
    const[testWord,setTestWord] = useState(10);
    const[testMode,setTestMode] = useState('time-mode');

       const values={
          testMode,
          setTestMode,
          testWord,
          setTestWord,
          testTime,
          setTestTime
       }
   
  return (
    <TestModeContext.Provider value = {values}>
    {children}
    </TestModeContext.Provider>
  )
}
 export const useTestMode =()=> useContext(TestModeContext);
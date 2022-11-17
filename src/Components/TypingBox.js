import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { useTestMode } from '../Contexts/TimerContext';
import Stats from './States';
import Uppermenu from './Uppermenu';

var randomWords = require('random-words');
const TypingBox = () => {
    const inputTextRef = useRef(null);

     const[currCharIndex,setCurrCharIndex] = useState(0);
     const[currWordIndex,setCurrWordIndex] = useState(0);
     const[countDown,setCountDown]= useState(15);
     const[testStart,setTestStart]= useState(false);
     const[testOver,setTestOver]= useState(false);
     const[intervalId,setIntervalId]= useState(null);
     const[correctChars,setCorrectChars] = useState(0);
     const[correctWords,setCorrectWords] = useState(0);
     const[incorrectChars,setIncorrectChars] = useState(0);
     const[extraChars,setExtraChars] = useState(0);
     const[missedChars,setMissedChars] = useState(0);
     const[graphData,setGraphData] = useState([]);
     const[wordsArray,setWordsArray] = useState(()=>{
       return randomWords(100);
     });

     const words = useMemo(()=>{
        return wordsArray
     },[wordsArray]); 

     const wordSpanRef = useMemo(()=>{
         return Array(words.length).fill(0).map(i=>createRef(null));
     },[words]); 
     
     const resetWordSpanRefClassNames =()=>{
        wordSpanRef.map(i=>{
            return (Array.from(i.current.childNodes).map(j=>{
                return (j.className = 'char');
            })
        )})
        wordSpanRef[0].current.childNodes[0].className= 'char current';
     }
    const startTimer = ()=>{
        const intervalId = setInterval(() => {
            setCountDown(pre=>{

                setCorrectChars((correctChars)=>{
                    setGraphData((data)=>{
                        return [...data,[testTime-pre,Math.round((correctChars/5)/((testTime-pre + 1)/60))]]
                    })
                    return correctChars; 
                })
                if(pre===1){
                    clearInterval(intervalId);
                    setCountDown(0);
                    setTestOver(true)
                }
                else{
                    return pre -1;
                }
            });
        },1000);
        setIntervalId(intervalId);
    }
    const handlekey =(e)=>{
        if(!testStart){
            startTimer();
            setTestStart(true);
        }
       
        let allChildrenSpan = wordSpanRef[currWordIndex].current.childNodes;
         if(e.keyCode===32){

            const correctChars = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');
            const incorrectChars = wordSpanRef[currWordIndex].current.querySelectorAll('.incorrect');
            setMissedChars(missedChars + (allChildrenSpan.length-(incorrectChars.length+correctChars.length)));
            if(correctChars.length===allChildrenSpan.length){
                setCorrectWords(correctWords+1);
            }
            if(allChildrenSpan.length <= currCharIndex){
                allChildrenSpan[currCharIndex-1].classList.remove('right');
            }
            else{
                allChildrenSpan[currCharIndex].className = allChildrenSpan[currCharIndex].className.replace('current','');
            }
            
            wordSpanRef[currWordIndex+1].current.childNodes[0].className = 'char current';

            setCurrWordIndex(setCurrWordIndex=>setCurrWordIndex+1);
            setCurrCharIndex(0);  
            return; 
         }
         
         if(e.keyCode===8){

            if(currCharIndex!==0){
                if(currCharIndex===allChildrenSpan.length){
                    
                    if(allChildrenSpan[currCharIndex-1].className.includes('extra')){
                        allChildrenSpan[currCharIndex-1].remove();
                        allChildrenSpan[currCharIndex-2].className +='right';
                    }else{
                        allChildrenSpan[currCharIndex-1].className ='char current';
                    }

                   setCurrCharIndex(currCharIndex-1);
                   return;
                 }

                allChildrenSpan[currCharIndex].className = 'char';
                allChildrenSpan[currCharIndex-1].className = 'char current';
                setCurrCharIndex(currCharIndex-1);
            }
            return;
         }
         
         if(currCharIndex===allChildrenSpan.length){
          let newSpan = document.createElement('span');
          newSpan.innerText = e.key;
          newSpan.className = 'char inCorrect right extra';
          allChildrenSpan[currCharIndex-1].className = allChildrenSpan[currCharIndex-1].className.replace('right','');

          wordSpanRef[currWordIndex].current.append(newSpan);
          setCurrCharIndex(currCharIndex+1);
          setExtraChars(extraChars+1);
            return;
         }

         if(e.key===allChildrenSpan[currCharIndex].innerText){
            allChildrenSpan[currCharIndex].className = 'char correct';
            setCorrectChars(correctChars+1); 
        }
         else{
            allChildrenSpan[currCharIndex].className = 'char inCorrect';
            setIncorrectChars(incorrectChars+1);
         }

         if(currCharIndex+1 === allChildrenSpan.length){
            allChildrenSpan[currCharIndex].className +=' right';
         }
         else{ 
            allChildrenSpan[currCharIndex+1].className = 'char current';
         }
         
         setCurrCharIndex(currCharIndex=>currCharIndex+1);
        }

       const calculateWpm=()=>{
        return Math.round((correctChars/5)/(testTime/60));
       }
       const calculateAccuracy = ()=>{
        return Math.round((correctWords/currWordIndex)*100);
       }
    const focusInput=()=>{
        inputTextRef.current.focus();
    }
    
    const testreset =()=> {
        setCurrCharIndex(0);
        setCurrWordIndex(0);
        setTestStart(false);
        setTestOver(false);
        clearInterval(intervalId);
        setCountDown(testTime);
        let random =  randomWords(100);
        setWordsArray(random);
        resetWordSpanRefClassNames();
    }

    useEffect(()=>{
       focusInput();
       wordSpanRef[0].current.childNodes[0].className= 'char current';
    },[])

     const {testTime} = useTestMode();

    useEffect(()=>{
        testreset();
     },[testTime])
  return (
    <div>
     {testOver? (<Stats wpm={calculateWpm()} accuracy={calculateAccuracy()} correctChars={correctChars}graphData={graphData} incorrectChars={incorrectChars} extraChars={extraChars} missedChars={missedChars}/>):(<div className='type-box' onClick={focusInput}>
     <Uppermenu countDown={countDown}/>
        <div className='words'>
              {words.map((word,index)=>(
                <span className="word" ref={wordSpanRef[index]} key={index}>
                    {word.split("").map((char,idx)=>(
                        <span className='char' key={`char${idx}`}>{char}</span>
                    ))}
                </span>
              ))}
        </div>
      </div>
    )}
    
    <input type='text' className='hidden-Input' ref={inputTextRef} onKeyDown={(e)=>handlekey(e)}/>
    </div>
  )
}

export default TypingBox;
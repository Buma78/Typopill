import React, { createRef, useEffect, useRef, useState } from 'react'

const TypingBox = ({words}) => {
    const inputTextRef = useRef(null);

     const[currCharIndex,setCurrCharIndex] = useState(0);
     const[currWordIndex,setCurrWordIndex] = useState(0);
     const[countDown,setCountDown]= useState(15);
     const[testStart,setTestStart]= useState(false);
     const[testOver,setTestOver]= useState(false);

    const wordSpanRef = Array(words.length).fill(0).map(i=>createRef(null));
     
    const startTimer = ()=>{
        const intervalId = setInterval(() => {
            setCountDown(pre=>{
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
    }
    const handlekey =(e)=>{
        if(!testStart){
            startTimer();
            setTestStart(true);
        }
       
        let allChildrenSpan = wordSpanRef[currWordIndex].current.childNodes;
         if(e.keyCode===32){
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
            return;
         }

         if(e.key===allChildrenSpan[currCharIndex].innerText){
            allChildrenSpan[currCharIndex].className = 'char correct';
         }
         else{
            allChildrenSpan[currCharIndex].className = 'char inCorrect';
         }

         if(currCharIndex+1 === allChildrenSpan.length){
            allChildrenSpan[currCharIndex].className +=' right';
         }
         else{ 
            allChildrenSpan[currCharIndex+1].className = 'char current';
         }
         
         setCurrCharIndex(currCharIndex=>currCharIndex+1);
    }
    const focusInput=()=>{
        inputTextRef.current.focus();
    }
    useEffect(()=>{
       focusInput();
       wordSpanRef[0].current.childNodes[0].className= 'char current';
    },[])
  return (
    <div>
     <h1>{countDown}</h1>
     {testOver? (<h1>Test Over</h1>):(<div className='type-box' onClick={focusInput}>
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
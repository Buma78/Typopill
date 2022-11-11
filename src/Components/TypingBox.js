import React, { createRef, useEffect, useRef, useState } from 'react'

const TypingBox = ({words}) => {
    const inputTextRef = useRef(null);
     const[currCharIndex,setCurrCharIndex] = useState(0);
     const[currWordIndex,setCurrWordIndex] = useState(0);

    const wordSpanRef = Array(words.length).fill(0).map(i=>createRef(null));
    console.log(wordSpanRef);
    const handlekey =(e)=>{
        let allChildrenSpan = wordSpanRef[currWordIndex].current.childNodes;
            console.log(e.key)
         if(e.key===allChildrenSpan[currCharIndex].innerText){
            allChildrenSpan[currCharIndex].className = 'char correct';
         }
         else{
            allChildrenSpan[currCharIndex].className = 'char inCorrect';
         }
         setCurrCharIndex(currCharIndex=>currCharIndex+1);
    }
    const focusInput=()=>{
        inputTextRef.current.focus();
    }
    useEffect(()=>{
       focusInput();
    },[])
  return (
    <div>
    <div className='type-box' onClick={focusInput}>
        <div className='words'>
              {words.map((word,index)=>(
                <span className="word" ref={wordSpanRef[index]}>
                    {word.split("").map((char,idx)=>(
                        <span>{char}</span>
                    ))}
                </span>
              ))}
        </div>
    </div>
    <input type='text' className='hidden-Input' ref={inputTextRef} onKeyDown={(e)=>handlekey(e)}/>
    </div>
  )
}

export default TypingBox;
import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before{
    box-sizing: border-box;
  }
  body{
    background: ${({theme})=>theme.background};
    color: ${({theme})=>theme.title};
    padding :0;
    margin: 0;
    transition: all 0.25s linear;
    overflow-y : scroll;
  }
   
   body::-webkit-scrollbar{
        display: none;
   }
  .canvas{
    display : grid;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    min-height: 100vh;
    gap: 0.5rem;
    padding : 1rem;
    width: 100vw;
    align-items:center;
  }

  .type-box{
       display:block;
       max-width:1000px;
       height: 170px;
       position: relative;
       margin-left:auto;
       margin-right:auto;
       overflow: hidden;
  }

  .words{
       font-size: 25px;
       display: flex;
       flex-wrap: wrap;
       align-content:center;
       width: 100%;  
  }

  .word{
    margin:5px;
    padding-right:2px;
  }

  .hidden-Input{
    opacity:0;
  }

  .correct{
    color: green;
  }

  .inCorrect{
    color:red;
  }
  
  .current{
    border-left: 1px solid;
    animation : blinking 2s infinite;
    animation-timing-function: ease;

    @keyframes blinking{
      0% {border-left-color:#fff;};
      25% {border-left-color:black;};
      50% {border-left-color:#fff;};
      75% {border-left-color:black;};
      100% {border-left-color:#fff;};
    }
  }

  .right{
    border-right: 1px solid;
    animation : blinkingRight 2s infinite;
    animation-timing-function: ease;

    @keyframes blinkingRight{
      0% {border-right-color:#fff;};
      25% {border-right-color:black;};
      50% {border-right-color:#fff;};
      75% {border-right-color:black;};
      100% {border-right-color:#fff;};
    }

  }

  .upper-menu{
    display:flex;
    padding:1rem;
    max-width:1000px;
    margin-left:auto;
    margin-right:auto;
    justify-content:space-between;
  }

  .timer-modes, .word-modes{
    display:flex;
  }

  .time, .no-of-word{
    margin-left:18px;
  }

  .time:hover, .no-of-word:hover, .mode:hover{
    color:yellow;
    cursor: pointer;
  }
  
  .stats-box{
    display : flex;
    max-width:1000px;
    height:auto;
    margin-left:auto;
    margin-right:auto;
  }

  .title{
    font-size:20px;
    color:grey;
  }

  .subtitle{
    font-size:30px;
    color:gold;
  }

  .left-stats{
    width :50%;
    padding :30px;
  }

  .right-stats{
    width : 70%;
  }

  .header{
    display: flex;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    justify-content:space-between;
    height: 60px;
  }

  .footer{
    display: flex;
    flex-direction:column;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    justify-content:space-between;
    align-items:center;
    height: 60px;
  }

  .actual-footer{
    display:flex;
    justify-content:space-between;
    width: 1000px;
  }
   
   .hint{
     kbd{
      background: ${({theme})=>theme.title};
      color: ${({theme})=>theme.background};
      padding: 2.5px 5px;
      border-radius:3px;
     }
   }
  .result-graph, .table{
    width: 1000px;
    margin : auto;
  }

  .user-profile{
    width:1000px;
    margin:auto;
    display: flex;
    min-height: 15rem;
    background: ${({theme})=> theme.typeBoxText};
    border-radius: 20px;
   }

  .user{
    display:flex;
    width: 50%;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 1rem;
    border-right: 2px solid;
    }

  .picture{
    width:50%;
    }

   .info{
    width: 50%;
    margin-top: 1rem;
    font-size: 1.5rem;
    text-align: center;
    padding: 1rem;
        }

    .total-times{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
       }

       .instruction{
        color: ${({theme})=>theme.title};
       }

    .reset-btn{
      display:block;
      margin:auto;
      margin-top: 3rem;
      transform: scale(2);
    }

    .compareContainer{
      width:100vw;
      display:flex;
      justify-content:center;
      align-items:center;
    }

    .userdtl{
      width:50%;
    }
`;
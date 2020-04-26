// Отрисовка текущего вопроса и ответов
import React from 'react';
import './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList';

 const ActiveQuiz =(props)=>{
   console.log(props)
    return (
     <div className='ActiveQuiz'>
        {/* вопрос */}
         <p className='Question'>
             <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
             </span>
             {/* какой из скольки */}
             <small>{props.answerNumber} из {props.quizLength}</small>
             
         </p>
         {/* варианты ответа */}
        <AnswersList 
        //правильно ли на текущий вопрос ответил
        state={props.state}
        answers ={props.answers} // для получения ответа
         //функция по нажатию на ответ
        onAnswerClick ={props.onAnswerClick}/> 
     </div>
    )
 }
 export default ActiveQuiz 
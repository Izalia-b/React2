import React from 'react';
import './AnswersList.css';
import AnswersItem from './AnswersItem/AnswersItem';
const AnswersList = (props)=>{
    return (
        <ul className='AnswersList'>
            {props.answers.map((answer,index)=>{ // Получить массив answers делаем иттерации(функция) с каждым элементом и выводить результат из колбек функции
                return(
                    <AnswersItem 
                    key ={index}
                    answer ={answer}
                    onAnswerClick ={props.onAnswerClick}
                    state ={props.state?props.state[answer.id]:null}
                    />
                )
            })}
        </ul>
    )
}
export default AnswersList

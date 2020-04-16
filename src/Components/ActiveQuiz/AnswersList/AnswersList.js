//Отрисовка списка ответов
import React from 'react';
import './AnswersList.css';
import AnswersItem from './AnswersItem/AnswersItem';

const AnswersList = (props)=>{
    return (
        <ul className='AnswersList'>
            {props.answers.map((answer,index)=>{ // Получить массив answers делаем иттерации(функция) с каждым элементом и выводить результат из колбек функции
             //индекс присваивает реакт для работы с дом деревом
             return(
                    //Один вариант ответа
                    <AnswersItem 
                    key ={index}// каждый ребенок в map должен иметь ключ
                    answer ={answer}// для получения текста ответа
                    //функция по нажатию на ответ
                    onAnswerClick ={props.onAnswerClick}
                    //правильно ли на текущий вопрос ответил
                    state ={props.state?props.state[answer.id]:null}
                    />
                )
            })}
        </ul>
    )
}
export default AnswersList

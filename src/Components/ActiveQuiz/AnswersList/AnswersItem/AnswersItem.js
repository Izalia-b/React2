// ОТрисовка одного варианта ответа
import React from 'react';
import './AnswersItem.css';

const AnswersItem = (props)=>{

    //массив класов
    const cls =['AnswersItem']

    if(props.state){
        cls.push(props.state)
    }

    return(
        <li className={cls.join(' ')} onClick={()=>props.onAnswerClick(props.answer.id)}>
        {/* Вывод текста ответа */}
        {props.answer.text}
        </li>
    )
}
export default AnswersItem
//Результаты текста
import React from 'react';
import './FinishedQuiz.css';
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';


const FinishedQuiz = props =>{
    //счетчик правильных ответов
    
    const succesCount = Object.keys(props.results).reduce((total, key) => {// Object.keys превращает обьект в массив ключей этого обьекта
        if(props.results[key] === 'success'){
            total++
        }
        return total
    },0)//метод reduce 1 параметр функция, 2 значение с какого начинать считать

    return(
        <div className ='FinishedQuiz'>
            <ul> 
                {props.quiz.map( //перебор списка вопросов и возвращение массива
                    (quizItem,index)=>{ //quizItem обект данного quiz
                        const cls = [  //создаем массив классов
                            'fa',
                            props.results[quizItem.id] ==='error'?'fa-times':'fa-check',// если в ответе error добавляем крестик или галочку
                            props.results[quizItem.id] // берем правильно или неправильно из резултатов
                        ]
                        return( // для чего key
                            <li key={index}> 
                                <strong>{index+1}</strong>. &nbsp; 
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    }
                )}
            </ul>
            <p>Правиьно {succesCount} из {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type='primary'> Повторить</Button>
                <Link to='/'>
                    <Button type='successButton'>Перейти в список тестов </Button>
                </Link>
            </div>
        </div>
    )
}
export default FinishedQuiz
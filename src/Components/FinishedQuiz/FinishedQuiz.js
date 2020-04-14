import React from 'react';
import './FinishedQuiz.css';

const FinishedQuiz = props =>{

    return(
        <div className ='FinishedQuiz'>
            <ul>
                <li>
                    <strong>1. </strong>
                    How are you
                    <i className='fa fa-times error'></i>
                </li>
                <li>
                    <strong>2. </strong>
                    How are you
                    <i className='fa fa-check success'></i>
                </li>
            </ul>
            <p>Правиьно 4 из 10</p>
            <div>
                <button>Пройти тест заново</button>
            </div>
        </div>
    )
}
export default FinishedQuiz
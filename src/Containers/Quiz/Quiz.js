//Самая главная первая страница теста
import React,{Component} from 'react';
import './Quiz.css';
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state ={
        //результаты полученые правильный или неправильный ответ но со всех вопросов 
        results:{},
        //закончился ли список
        isFinished:false,
        // меняет вопрос и ответы и номер
        activeQuestion : 0,
        // хранить информацию о текущем клике пользователя , правильный или неправильный ответ
        answerState: null,
        //список вопросов с вариантами ответа
        quize:[
            {
            rightAnswerId:2,
            question:'Какого цвета небо?',
            //номер вопроса
            id:1,
            answers:[
                {text: 'Черный',id:1},//номер ответа
                {text: 'Синий',id:2},
                {text: 'Красный',id:3},
                {text: 'Зеленый',id:4},
            ]
        
    },
    {
        rightAnswerId:3,
        question:'В каком году был основан Санкт-Петербург?',
        id:2,
        answers:[
            {text: '1700',id:1},
            {text: '1702',id:2},
            {text: '1703',id:3},
            {text: '1706',id:4},
        ]
    }]
    }



    //при нажатии на ответ
    onAnswerClickHandler = (answerId)=>{
        // если есть прав или неправ ответ
        if(this.state.answerState){
            //
            const key = Object.keys(this.state.answerState)[0] // Object.keys превращает обьект в массив ключей этого обьекта
               // если есть прав
            if(this.state.answerState[key]==='success'){
                    return // чтобы не было перемещение по вопросам
                }
        }

        // получить доступ к вопросу 
        const question = this.state.quize[this.state.activeQuestion]

        // доступ к результатам всех вопросов
        const results = this.state.results

       
        if(question.rightAnswerId === answerId){
            //если правильный ответ и если  еще не отвечал
            if(!results[question.id]){
                results[question.id]='success' 
            }
            
            this.setState({
                answerState:{[answerId]:'success'},
                results:results
            })



            //если правильный ответ
            const timeout = window.setTimeout(()=>{
                if(this.isQuizFinished()){//если закончился тест 
                    this.setState({
                        isFinished:true
                    })
                }else{
                    this.setState({//переключение на следующий вопрос и изменение номера вопроса
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState:null//при переходе на след вопрос убрать подсветку 
                    })
                }
                window.clearTimeout(timeout)
            },1000)
        }else{//неправильно ответили
            // запись в результат по всем вопросам
            results[question.id]='error'
            this.setState({
                //результат одного вопроса
                answerState:{[answerId]:'error'},
                results: results,
            })

        }
    }
    
    //закончилось голосование или нет(возвращает true or false)
    isQuizFinished(){
        return this.state.activeQuestion+1 === this.state.quize.length
    }
    // Функция для кнопки - Пройти тест заново
    retryHandler =()=>{//обнуление всего state
        this.setState({
        results:{},
        isFinished:false,
        activeQuestion : 0,
        answerState: null,
        })
    }
    render(){
        return(
            <div className='Quiz'>
                <div className='QuizWropper'>
                    <h1>Ответьте на все вопросы</h1>
                    {this.state.isFinished


                    //Отрисовка тест пройден
                    ? <FinishedQuiz
                    // результаты всех вопросов
                    results={this.state.results}
                    //сам вопрос
                    quiz={this.state.quize}
                    //функция пройти тест заново
                    onRetry={this.retryHandler}
                    />


                    //Отрисовка текущего вопроса и ответов
                    : < ActiveQuiz 
                    //передать ответы 
                    answers ={this.state.quize[this.state.activeQuestion].answers}
                    //передать вопрос
                    question ={this.state.quize[this.state.activeQuestion].question}
                    //функция по нажатию на ответ
                    onAnswerClick ={this.onAnswerClickHandler}
                    //длинна списков вопросов
                    quizeLength={this.state.quize.length}
                    //номер текущего вопроса +1 чтобы вывести именно число а не индекс
                    answerNumber={this.state.activeQuestion +1}
                    //правильно ли на текущий вопрос ответил
                    state ={this.state.answerState}
                    />
                    }
                </div>
            </div>
        )
    }
}
export default Quiz
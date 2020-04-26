import React, {Component} from 'react'
import './Quiz.css'
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz'
//import axios from '../../axios-quiz/axios-quiz'
import Loader from '../../Components/UI/Loaders/Loaders'
import {connect} from 'react-redux'
//import {fetchQuizById} from '../../store/actions/quiz'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }
// при переключении страницы сбрасывать ответы
  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className='Quiz'>
        <div className='QuizWrapper'>
          <h1>Ответьте на все вопросы</h1>

          {
            this.props.loading || !this.props.quiz
             ? <Loader />
             : this.props.isFinished
              ? <FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz}
                onRetry={this.props.retryQuiz}
              />
              : <ActiveQuiz
                answers={this.props.quiz[this.props.activeQuestion].answers}
                question={this.props.quiz[this.props.activeQuestion].question}
                onAnswerClick={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                state={this.props.answerState}
              />

          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //загрузка теста по id
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    ////вместо метода который срабатывает при нажатии на ответ правильно или неправильно 
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    //для обнуление вопросов при переключении
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from './actionTypes'
import axios from '../../axios-quiz/axios-quiz'
//создание вопроса 
export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}
//обнуление теста 
export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}
 //создание теста
export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post('/quizes.json', getState().create.quiz)
    dispatch(resetQuizCreation())
  }
}
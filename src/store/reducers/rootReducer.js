import {combineReducers} from 'redux';
import quizReduser from './quiz';
import  createReducer  from '../reducers/create';
import authReduser  from '../reducers/auth';


export default combineReducers({
    quiz: quizReduser,
    create: createReducer,
    auth: authReduser,
})
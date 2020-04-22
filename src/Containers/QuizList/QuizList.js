import React, { Component } from 'react';
import './QuizList.css';
import {NavLink} from 'react-router-dom';
import axios from '../../axios-quiz/axios-quiz';
import Loaders from '../../Components/UI/Loaders/Loaders';


export default class QuizList extends Component{
    state={
        //список всех тестов
        quizes:[],
        loading:true,
    }

    renderQuizes(){
        return this.state.quizes.map((quiz)=>{
            return(
                <li key={quiz.id}>
                    <NavLink to={'/quiz/'+quiz.id}>
                     {quiz.name}
                     </NavLink>
                </li>
            )
        }
        )
    }
    
    async componentDidMount() {
        try {
            //получение данных
          const response = await axios.get('/quizes.json')
    
          const quizes = []
    
          Object.keys(response.data).forEach((key, index) => {
            quizes.push({
              id: key,//id теста из базы данных
              name: `Тест №${index + 1}`
            })
          })
    
          this.setState({
            quizes, 
            loading: false
          })
        } catch (e) {
          console.log(e)
        }
      }


    render(){
        return(
            <div className='QuizList'>
                <div>
                    <h1>Список тестов </h1>
                    {
                        this.state.loading
                        ?<Loaders/>
                        :<ul>
                            {this.renderQuizes()}
                        </ul>
                    }
                </div>
            </div>
            
        )
    }
}
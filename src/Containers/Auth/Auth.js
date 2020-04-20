import React, { Component } from 'react';
import './Auth.css';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';

export default class Auth extends Component{
    loginHandler=()=>{

    }
    registerHandler=()=>{

    }
    submitHandler=(event)=>{
        event.preventDefault();
    }
    render(){
        return(
            <div className='Auth'>
               <div>
                   <h1>Авторизация</h1>
                   <form className='AuthForm' onSubmit={this.submitHandler}>
                       <Input label='Email'/>
                       <Input label='Password ' errorMessage={'Test'}/>
                       <Button type='successButton' onClick={this.loginHandler}>Войти</Button>
                       <Button type='primary' onClick={this.registerHandler}>Зарегистрироваться</Button>
                   </form>
               </div>
            </div>
        )
    }
}
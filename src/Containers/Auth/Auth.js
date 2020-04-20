import React, {Component} from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

export default class Auth extends Component {

  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        //поля относящиеся к валидации
        errorMessage: 'Введите корректный email',
        //состоянии валидации
        valid: false,
        touched: false,
        //правила
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = event => {
    event.preventDefault()
  }

  onChangeHandler = (event, controlName) => {
    console.log(`${controlName}: `, event.target.value)
  }

  renderInputs() {//получить массив из email и password инпутов
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          // в control находится обьект email или password и все его св-ва
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          //!! приводит к булиан типу
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          //
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>

            { this.renderInputs() }

            <Button
              type="success"
              onClick={this.loginHandler}
            >
              Войти
            </Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
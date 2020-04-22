import React, {Component} from 'react'
import './Auth.css'
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios';

export default class Auth extends Component {

  state = {
    isFormValid:false,
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

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAcoNCMncJKL_14Fb84XSn8SL74DZzZ6Zk', authData)

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAcoNCMncJKL_14Fb84XSn8SL74DZzZ6Zk', authData)

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  submitHandler = event => {
    event.preventDefault()
  }

//
  validateControl(value, validation) {
      //если не параметра, не проверять значит
    if (!validation) {
      return true
    }

    let isValid = true

//если 
    if (validation.required) {
        //trim() очищает пробелы и если не пустой строке и && если до этого была уже false
      isValid = value.trim() !== '' && isValid
    }
//если 
    if (validation.email) {
      isValid = is.email(value) && isValid
    }
//если 
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }



  onChangeHandler = (event, controlName) => {
      // чтобы не мутировался state копию  state и control
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }
    //переопределяем значения
    control.value = event.target.value
    control.touched = true
    //передаем новое значение и validation из стейта
    control.valid = this.validateControl(control.value, control.validation)
    //обновляем formControls
    formControls[controlName] = control
//если что то пишем в инпут 
    let isFormValid = true
//пройтись по всем обьектам , получим либо имейл либо пароль
    Object.keys(formControls).forEach(name => { 
      isFormValid = formControls[name].valid && isFormValid//у имейл либо пароль проверяем валидно ли оно
    })
    //изменить состояние обьекта
    this.setState({
      formControls, isFormValid
    })
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
      <div className='Auth'>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className='AuthForm'>

            { this.renderInputs() }

            <Button
              type="successButton"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
//берет все передаваемые параметры + добавляет свои общие параметры 
export function createControl(config,validation){
    return{
        ...config,
        validation,
        valid:false,//false
        touched: false,
        value: ''
    }
}
//проверка набора правил
export function validate(value, validation = null) {
    if (!validation) {
      return true
    }
  
    let isValid = true
  //если есть такое требование к валидации
    if (validation.required) {
      isValid = value.trim() !== '' && isValid//если значение не пустое true
    }
  
    return isValid
  }
  //если валидные все инпуты то вся форма будет валидная
  export function validateForm(formControls) {
    let isFormValid = true
  
    for (let control in formControls) { //control -строковое значение ключа данного обьекта
      if (formControls.hasOwnProperty(control)) {//если находится в корне обьекта formControls, те поля которые вписывали в state
        isFormValid = formControls[control].valid && isFormValid
      }
    }
  
    return isFormValid
  }
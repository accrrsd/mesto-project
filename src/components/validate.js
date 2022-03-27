export function enableValidation({formSelector,inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass}){
  const forms=Array.from(document.querySelectorAll(formSelector))
  forms.forEach(form=>{
    const inputs = Array.from(form.querySelectorAll(inputSelector))
    const submitBtn = form.querySelector(submitButtonSelector)
    // Пока поля незаполнены в первый раз, кнопка пуста
    toggleButtonBlock(submitBtn, inactiveButtonClass, inputs.some(input=>!input.validity.valid))

    inputs.forEach(input=>{input.addEventListener('input',()=>{
      checkValid(form,input,inputErrorClass,errorClass)
      toggleButtonBlock(submitBtn, inactiveButtonClass, inputs.some(input=>!input.validity.valid))
    })
  })
  })
}


function checkValid(form,input,inputErrorClass,errorClass){
  if (!input.validity.valid){
    showValidationError(form,input,input.validationMessage,inputErrorClass,errorClass)
  }
  else{
    hideValidationError(form,input,inputErrorClass,errorClass)
  }
}

export function toggleButtonBlock(elem, blockButtonClass, invalid){
  if (invalid){
    elem.classList.add(blockButtonClass)
    elem.disabled=true
  }
  else{
    elem.classList.remove(blockButtonClass)
    elem.disabled=false
  }
}

function showValidationError(form,input,errorMassage,inputError,errorClass){
  input.classList.add(inputError)
  const errorSpan = form.querySelector(`.${input.id}-error`);
  errorSpan.classList.add(errorClass)
  errorSpan.textContent=errorMassage
}

function hideValidationError(form,input,inputError,errorClass){
  input.classList.remove(inputError)
  const errorSpan = form.querySelector(`.${input.id}-error`);
  errorSpan.classList.remove(errorClass)
  errorSpan.textContent=''
}




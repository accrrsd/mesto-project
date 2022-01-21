const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt:'Поле'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt:'Равнина'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt:'Город'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt:'Гора'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt:'Роле'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt:'Гора'
  }
]

// Общий попап
const popup=document.querySelector('.popup')

// Профиль
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const profileEditButton = document.querySelector('#profile-edit')

const placeAddButton = document.querySelector('#add-card')

// Настройка попапа
const popupContent = popup.querySelector('.popup__content')
const popupTitle = popup.querySelector('.popup__title')
const popupForm = popup.querySelector('#popup__form')
const popupFirstField = popupForm.querySelectorAll('.form__field')[0]
const popupSecondField = popupForm.querySelectorAll('.form__field')[1]
const popupSubmitBtn = popup.querySelector('.form__submit')


function displayPopup(type,place){
  // Стандартное закрытие
  const popupClose = popup.querySelector('.popup__close')
  popupClose.onclick=()=>{smoothDisplay('hide')}

  switch (type) {
    case 'edit':
      popupTitle.textContent='Редактировать профиль'
      popupSubmitBtn.textContent='Сохранить'

      popupFirstField.value=profileTitle.textContent
      popupSecondField.value=profileSubtitle.textContent

      popupFirstField.placeHolder=''
      popupSecondField.placeHolder=''
      smoothDisplay('show')

      popupForm.onsubmit=(e)=>{
        e.preventDefault()
        profileTitle.textContent=popupFirstField.value
        profileSubtitle.textContent=popupSecondField.value
        smoothDisplay('hide')
      }
      break;
    case 'card':
      popupTitle.textContent='Новое место'
      popupSubmitBtn.textContent='Создать'

      popupFirstField.placeholder='Название'
      popupSecondField.placeholder='Ссылка на картинку'
      
      popupFirstField.value=''
      popupSecondField.value=''
      
      smoothDisplay('show')

      popupForm.onsubmit=(e)=>{
        e.preventDefault()
        const place = {
          name:popupFirstField.value,
          link:popupSecondField.value
        }
        initialCards.unshift(place)
        smoothDisplay('hide')
        renderPlaces()
      }
      break;
    case 'image':
      // Изменяем название
      popupTitle.textContent = place.querySelector('.place__title').textContent
      popupTitle.classList.add('popup__title_type_image')
      
      //создаем картинку
      const popupImage = document.createElement('img')
      popupImage.src = place.querySelector('.place__image').src
      popupImage.style.maxWidth='75vw'
      popupImage.style.maxHeight='75vh'

      // Очищаем контент внутри
      popupContent.classList.remove('popup__content_type_form')
      popupForm.style.display='none'

      // Вставляем картинку
      popupContent.prepend(popupImage)
      smoothDisplay('show')

      // Измененное закрытие
      popupClose.onclick=()=>{
        popup.style.opacity='0'
        popup.ontransitionend=()=>{
          popup.style.visibility='hidden'
          
          popupContent.classList.add('popup__content_type_form')
          popupTitle.classList.remove('popup__title_type_image')
          popupForm.style.display='block'
          popupImage.remove()
        }
      }
      break;
  }
}

function renderPlaces(){
  const placeContainer = document.querySelector('.places')
  placeContainer.innerHTML=''

  const placeTemplate = document.querySelector('#place-template').content
  
  initialCards.forEach(element => {
    // Создаем копию шаблона
    const place = placeTemplate.cloneNode(true)
    const title = place.querySelector('.place__title')
    const image = place.querySelector('.place__image')

    // Конкретная карточка
    const currentPlace = image.closest('.place')

    // Наполняем контент
    title.textContent=element.name
    image.src=element.link

    image.alt=element.alt? element.alt:''

    // Открытие картинки
    image.onclick=()=>{displayPopup('image',currentPlace)}

    // Лайк
    const likeButton = currentPlace.querySelector('.place__like')
    likeButton.onclick=()=>{likeButton.classList.toggle('place__like_active')}

    // Удалить
    const deletePlaceButton = currentPlace.querySelector('.place__trash')
    deletePlaceButton.onclick=()=>{
      for (let i = 0; i < initialCards.length; i++) {
        if (initialCards[i].name===title.textContent){initialCards.splice(i,1)}
      }
      renderPlaces()
    }
    // Рендерим
    placeContainer.append(place)
  });
}

function smoothDisplay(param){
  switch (param) {
    case 'show':
      popup.ontransitionend=''
      popup.classList.add('popup_opened')
      popup.style.visibility='visible'
      popup.style.opacity='1'
      break;
    case 'hide':
      popup.style.opacity='0'
      popup.ontransitionend=()=>{
        popup.style.visibility='hidden'
      }
      break;
  }
}

profileEditButton.onclick=()=>{
  displayPopup('edit')
}

placeAddButton.onclick=()=>{
  displayPopup('card')
}

renderPlaces()

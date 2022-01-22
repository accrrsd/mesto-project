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

// Попапы
const popupImage = document.querySelector('.popup_type_image')
const popupAddCard = document.querySelector('.popup_type_add-card')
const popupProfile = document.querySelector('.popup_type_profile')

// Профиль
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

// Контейнер мест
const placeContainer = document.querySelector('.places')


// #region Данные из попапов
// Профиль
const popupProfileName = popupProfile.querySelector('input[name="name"]')
const popupProfileSubname = popupProfile.querySelector('input[name="subname"]')
const popupProfileSubmit = popupProfile.querySelector('.form__submit')

// Карточка
const popupAddCardName = popupAddCard.querySelector('input[name="image-name"]')
const popupAddCardUrl = popupAddCard.querySelector('input[name="url"]')
const popupAddCardSubmit = popupAddCard.querySelector('.form__submit')

// Картинка
const popupImageTitle = popupImage.querySelector('.popup__title')
const popupImagePicture = popupImage.querySelector('.popup__picture')
//#endregion

// Триггеры открытия
const profileEditButton = document.querySelector('#profile-edit')
const addCardButton = document.querySelector('#add-card')

// Триггеры закрытия
const popupCloseButtons = document.querySelectorAll('.popup__close')


// Евент открытия
profileEditButton.addEventListener('click',()=>{
  openPopup(popupProfile)
})

addCardButton.addEventListener('click',()=>{
  openPopup(popupAddCard)
})

// Евент закрытия
popupCloseButtons.forEach(close => {
  close.addEventListener('click',()=>{
    closePopup(close.closest('.popup_opened'))
  })
});

//#region Евент принятия

// Профиль
popupProfileSubmit.addEventListener('click',(e)=>{
  e.preventDefault()
  profileTitle.textContent=popupProfileName.value
  profileSubtitle.textContent=popupProfileSubname.value

  closePopup(popupProfileSubmit.closest('.popup_opened'))
})

// Карточка
popupAddCardSubmit.addEventListener('click',(e)=>{
  e.preventDefault()
  initialCards.unshift(
    {
      name:popupAddCardName.value,
      link:popupAddCardUrl.value
    })
  renderPlaces()

  closePopup(popupAddCardSubmit.closest('.popup_opened'))
})
//#endregion



// Данные попапа профиля
popupProfileName.value=profileTitle.textContent
popupProfileSubname.value=profileSubtitle.textContent

// Открытие
function openPopup(popup){
  popup.classList.add('popup_opened')
}

// Закрытие
function closePopup(popup){
  popup.classList.remove('popup_opened')
}

// Создание карточки
function placeCreate(name,url,alt){
  // Шаблон
  const placeTemplate = document.querySelector('#place-template').content

  // Части карточка
  const place = placeTemplate.cloneNode(true)

  const currentPlace = place.querySelector('.place')
  const title = place.querySelector('.place__title')
  const image = place.querySelector('.place__image')

  // Наполнение карточки
  title.textContent=name
  image.src=url
  image.alt=alt? alt:''

  // #region События карточки
  // Лайк
  const likeButton = currentPlace.querySelector('.place__like')
  likeButton.addEventListener('click',()=>{likeButton.classList.toggle('place__like_active')})

  // Удалить
  const deletePlaceButton = currentPlace.querySelector('.place__trash')
  deletePlaceButton.addEventListener('click',()=>{
    for (let i = 0; i < initialCards.length; i++) {
      if (initialCards[i].name===title.textContent){initialCards.splice(i,1)}
    }
    currentPlace.remove()
    return
  })
  // Открыть картинку
  image.addEventListener('click',()=>{
    popupImagePicture.src=image.src
    popupImagePicture.alt=image.alt
    popupImageTitle.textContent=title.textContent

    openPopup(popupImage)
  })
  //#endregion
  
  return place
}

// Отрисовка мест
function renderPlaces(){
  placeContainer.innerHTML=''
  initialCards.forEach(card => {
    if (card.alt){placeContainer.append(placeCreate(card.name,card.link,card.alt))}
    else{placeContainer.append(placeCreate(card.name,card.link))}
  });
}

renderPlaces()


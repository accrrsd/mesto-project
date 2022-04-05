import { closePopup, openPopup } from './modal.js'
import { profileTitle, profileSubtitle, profileAvatar, popupAvatar, popupAvatarUrl, popupAvatarForm, popupProfile, popupProfileForm, popupProfileName, popupProfileSubname } from './variables'
import { buildFetchData } from './api'
import { findSubmitBtn } from './utils.js'

// Обновление профиля
popupProfileForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const submitBtn = findSubmitBtn(popupProfileForm)
  submitBtn.textContent = 'Сохранение...'

  // Получение данных из попапа
  profileTitle.textContent = popupProfileName.value
  profileSubtitle.textContent = popupProfileSubname.value

  buildFetchData('users/me', 'jsonPatch', { name: popupProfileName.value, about: popupProfileSubname.value }).then(() => {
    submitBtn.textContent = 'Сохранить'
    closePopup(popupProfile)
  })
})

// Обновление аватарки
popupAvatar.addEventListener('submit', (e) => {
  e.preventDefault()
  const submitBtn = findSubmitBtn(popupAvatar)
  submitBtn.textContent = 'Сохранение...'
  buildFetchData('users/me/avatar', 'jsonPatch', { avatar: popupAvatarUrl.value }).then(() => {
    profileAvatar.src = popupAvatarUrl.value
    closePopup(popupAvatar)
    submitBtn.textContent = 'Сохранить'
    popupAvatarForm.reset()
  })
})

export function openProfilePopup() {
  // Данные попапа профиля
  popupProfileName.value = profileTitle.textContent
  popupProfileSubname.value = profileSubtitle.textContent
  openPopup(popupProfile)
}

// Получение профиля
buildFetchData('users/me', 'jsonGet').then((profileServerData) => {
  profileTitle.textContent = profileServerData.name
  profileSubtitle.textContent = profileServerData.about
  profileAvatar.src = profileServerData.avatar
})

import { closePopup, openPopup } from './modal.js'
import { profileTitle, profileSubtitle, profileAvatar, popupAvatar, popupAvatarUrl, popupAvatarForm, popupProfile, popupProfileForm, popupProfileName, popupProfileSubname } from './variables'
import { loadProfileOnServer, loadAvatarOnServer } from './api'

// Обновление профиля
popupProfileForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const submitBtn = e.submitter
  submitBtn.textContent = 'Сохранение...'

  // Получение данных из попапа
  profileTitle.textContent = popupProfileName.value
  profileSubtitle.textContent = popupProfileSubname.value

  loadProfileOnServer({ name: popupProfileName.value, about: popupProfileSubname.value })
    .then(() => {
      closePopup(popupProfile)
    })
    .catch((err) => console.log(err))
    .finally(() => (submitBtn.textContent = 'Сохранить'))
})

// Обновление аватарки
popupAvatar.addEventListener('submit', (e) => {
  e.preventDefault()
  const submitBtn = e.submitter
  submitBtn.textContent = 'Сохранение...'
  loadAvatarOnServer({ avatar: popupAvatarUrl.value })
    .then(() => {
      profileAvatar.src = popupAvatarUrl.value
    })
    .catch((err) => console.log(err))
    .finally(() => {
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

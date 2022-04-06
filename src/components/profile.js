import { closePopup, openPopup } from './modal.js'
import { profileTitle, profileSubtitle, profileAvatar, popupAvatar, popupAvatarUrl, popupAvatarForm, popupProfile, popupProfileForm, popupProfileName, popupProfileSubname } from './variables'
import { loadProfileOnServer, loadAvatarOnServer } from './api'
import { toggleButtonBlock } from './validate'

// Обновление профиля
popupProfileForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const submitBtn = e.submitter
  submitBtn.textContent = 'Сохранение...'

  loadProfileOnServer({ name: popupProfileName.value, about: popupProfileSubname.value })
    .then(() => {
      // Получение данных из попапа
      profileTitle.textContent = popupProfileName.value
      profileSubtitle.textContent = popupProfileSubname.value
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitBtn.textContent = 'Сохранить'
      closePopup(popupProfile)
      toggleButtonBlock(submitBtn, 'form__submit_disabled', true)
    })
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
      toggleButtonBlock(submitBtn, 'form__submit_disabled', true)
    })
})

export function openProfilePopup() {
  // Данные попапа профиля
  popupProfileName.value = profileTitle.textContent
  popupProfileSubname.value = profileSubtitle.textContent
  openPopup(popupProfile)
}

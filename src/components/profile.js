import { closePopup, openPopup } from './modal.js'
import { profileTitle, profileSubtitle, popupProfile, popupProfileForm, popupProfileName, popupProfileSubname } from './variables'

// Профиль
popupProfileForm.addEventListener('submit', (e) => {
  e.preventDefault()
  profileTitle.textContent = popupProfileName.value
  profileSubtitle.textContent = popupProfileSubname.value

  closePopup(popupProfile)
})

export function openProfilePopup() {
  // Данные попапа профиля
  popupProfileName.value = profileTitle.textContent
  popupProfileSubname.value = profileSubtitle.textContent
  openPopup(popupProfile)
}

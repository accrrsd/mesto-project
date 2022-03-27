// Попапы
const overlays = Array.from(document.querySelectorAll('.popup'))

// Ивенты закрытия
overlays.forEach((overlay) => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('popup__close')) {
      closePopup(overlay)
    }
  })
})

// Открытие
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', handleEscKey)
}

// Закрытие
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', handleEscKey)
}

// Слушатель
function handleEscKey(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    if (openedPopup) {
      closePopup(openedPopup)
    }
  }
}

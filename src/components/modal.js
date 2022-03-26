// Попапы
const overlays = Array.from(document.querySelectorAll('.popup'))

// Ивенты закрытия
overlays.forEach(overlay=>{
  overlay.addEventListener('click',e=>{
    if (e.target===overlay || e.target.classList.contains('popup__close')){
      closePopup(overlay)
    }
  })
})

// Открытие
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown',keyHandler)
}

// Закрытие
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown',keyHandler)
}

// Слушатель
function keyHandler(e){
  if (e.key==='Escape'){
    const opened = document.querySelector('.popup_opened')
    if (opened){
      closePopup(opened)
    }
  }
}

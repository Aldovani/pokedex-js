const buttons = document.querySelector('.button');

window.addEventListener('scroll', () => {
 const top =document.querySelector('header').getBoundingClientRect().top
  if (top <= -1000) {
    buttons.classList.add('visible')
  }
  else {
    buttons.classList.remove('visible')
  }

})

buttons.addEventListener('click', () => {
  scrollTo(0,0)
})
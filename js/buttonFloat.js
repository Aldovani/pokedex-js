const buttons = document.querySelector('.button');

window.addEventListener('scroll', (e) => {
 const top =document.querySelector('header').getBoundingClientRect().top

  if (-600 >= top) {
    buttons.classList.add('visible')
  }
  else {
    
    buttons.classList.remove('visible')
  
  }

})



buttons.addEventListener('click', () => {
  scrollTo(0,0)
})
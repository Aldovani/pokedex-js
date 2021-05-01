const input = document.querySelector('input')
input.addEventListener('change', (e) => {
  if(input.checked)
   console.log( document.body.classList.add("dark-mode")) 
  else
  console.log( document.body.classList.remove("dark-mode")) 
    
})
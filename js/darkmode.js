const input = document.querySelector("input");

input.addEventListener("change", () => {
  if (input.checked) {
    document.body.classList.toggle("dark-mode");
  } else {
    document.body.classList.toggle("dark-mode");
  }
});



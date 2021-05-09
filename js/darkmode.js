const input = document.querySelector("input");
if (localStorage.getItem("darkMod")) {
  if (localStorage.getItem("darkMod")=="true")input.checked=true

} else {
  localStorage.setItem("darkMod", false);
  input.checked = false;
}

function dark() {
  if (input.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMod", true);
  } else {
    localStorage.setItem("darkMod", false);
    document.body.classList.remove("dark-mode");
  }
}
dark();

input.addEventListener("change", dark);

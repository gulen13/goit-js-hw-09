const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
const body = document.querySelector('body');
let timerId = null;
btnStop.setAttribute("disabled", "");

btnStart.addEventListener('click', () => {
  onButtonStart();
  btnStart.setAttribute("disabled", "");
  btnStop.removeAttribute("disabled");
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStop.setAttribute("disabled", "");
  btnStart.removeAttribute("disabled");
});

function onButtonStart() {
  timerId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
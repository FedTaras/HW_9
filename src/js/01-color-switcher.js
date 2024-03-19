const ref = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let id = null;

ref.startBtn.addEventListener('click', changeColor);
ref.stopBtn.addEventListener('click', stopFn);

ref.stopBtn.disabled = true;

function changeColor() {
  ref.startBtn.disabled = true;
  ref.stopBtn.disabled = false;
  id = setInterval(() => {
    ref.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopFn() {
  clearInterval(id);
  ref.stopBtn.disabled = true;
  ref.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

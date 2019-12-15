const clockContainer = document.querySelector(".js-clock"),
  clokcTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getDate();
  const hours = date.getHours();

  clokcTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();

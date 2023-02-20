const scrollBar = document.querySelector(".scrollbar .bar");
const portFolio = document.querySelector(".contentWrap h1");

window.addEventListener("DOMContentLoaded", () => {
  let splitText = portFolio.innerText.split("");
  portFolio.innerText = "";
  splitText.forEach((text, idx) => {
    let char = document.createElement("span");
    char.innerText = text;
    char.style.display = `inline-block`;
    // char.style.animation = `moveTextUpDown .9s ${
    //   idx * 0.1
    // }s infinite alternate-reverse`;
    char.style.animationDelay = `${idx * 0.1}s`;
    portFolio.append(char);
  });
});

window.onscroll = () => {
  let y = window.scrollY;
  let percent = (y / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = `${percent}%`;
};

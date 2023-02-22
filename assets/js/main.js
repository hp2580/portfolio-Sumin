const scrollBar = document.querySelector(".scrollbar .bar"),
  portFolio = document.querySelector(".contentWrap h1"),
  project = document.querySelector(".projects"),
  sticky = document.querySelector(".stickyWrap");

const hScroll = () => {
  let top = project.getBoundingClientRect().top;
  let stickyTop = sticky.getBoundingClientRect().top;
  let scrollWidth = sticky.scrollWidth;
  let scrollHeight = project.scrollHeight - sticky.scrollHeight;
  if (stickyTop < 1) {
    sticky.scrollLeft = (scrollWidth / scrollHeight) * -top * 0.8;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  let splitText = portFolio.innerText.split("");
  portFolio.innerText = "";
  splitText.forEach((text, idx) => {
    let char = document.createElement("span");
    char.innerText = text;
    char.style.display = `inline-block`;
    char.style.animationDelay = `${idx * 0.1}s`;
    portFolio.append(char);
  });
});

window.onscroll = () => {
  let y = window.scrollY;
  let percent = (y / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = `${percent}%`;

  hScroll();
};

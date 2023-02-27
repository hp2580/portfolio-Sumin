const scrollBar = document.querySelector(".scrollbar .bar"),
  portFolio = document.querySelector(".contentWrap h1"),
  project = document.querySelector(".projects"),
  sticky = document.querySelector(".stickyWrap"),
  projects = document.querySelectorAll(".project:not(:first-child)"),
  btnProjects = document.querySelectorAll(".btnMore"),
  modalWrap_p = document.querySelector(".modalProject"),
  modal_p = document.querySelector(".modalProject .modal"),
  closeModal_p = document.querySelector(".modalProject .modalClose"),
  slides = document.querySelectorAll(".slide a"),
  modalWrap_r = document.querySelector(".modalReact"),
  modal_r = document.querySelector(".modalReact .modal"),
  closeModal_r = document.querySelector(".modalReact .modalClose"),
  controlModal = document.querySelectorAll(".modalReact .btn"),
  modalSlider = document.querySelectorAll(".modalReact .slider"),
  sections = document.querySelectorAll("section:not(.home, .projects)");

const clearClass = (elements, className) => {
  elements.forEach((element) => {
    element.classList.remove(className);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    animateText();
    toggleFadeProject();
  });
});

window.onscroll = () => {
  let y = window.scrollY;
  let percent = (y / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = `${percent}%`;

  hScroll();
  toggleFadeProject();
};

window.onresize = () => {
  hScroll();
};

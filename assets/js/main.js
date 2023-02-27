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

/**
 *
 * @param {*} elements 클래스를 삭제할 대상이 요소
 * @param {*} className 삭제할 클래스 이름
 */
const clearClass = (elements, className) => {
  elements.forEach((element) => {
    element.classList.remove(className);
  });
};

/**
 *
 * @param {*} elements 클래스를 추가할 대상이 요소
 * @param {*} className 추가할 클래스 이름
 */
const scrollToToggle = (elements, className) => {
  elements.forEach((element) => {
    let top = element.getBoundingClientRect().top;
    if (top < window.innerHeight / 2) {
      if (!element.classList.contains(className))
        element.classList.add(className);
    } else {
      if (element.classList.contains(className))
        element.classList.remove(className);
    }
  });
};

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    animateText();
    toggleFadeProject();
    scrollToToggle(sections, "view");
  });
});

window.onscroll = () => {
  let y = window.scrollY;
  let percent = (y / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = `${percent}%`;

  hScroll();
  toggleFadeProject();
  scrollToToggle(sections, "view");
};

window.onresize = () => {
  hScroll();
};

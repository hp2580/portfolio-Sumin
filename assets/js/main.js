const scrollBar = document.querySelector(".scrollbar .bar"),
  portFolio = document.querySelector(".contentWrap h1"),
  project = document.querySelector(".projects"),
  sticky = document.querySelector(".stickyWrap"),
  projects = document.querySelectorAll(".project:not(:first-child)");

const animateText = () => {
  let splitText = portFolio.innerText.split("");
  portFolio.innerText = "";
  splitText.forEach((text, idx) => {
    let char = document.createElement("span");
    char.innerText = text;
    char.style.display = `inline-block`;
    char.style.animationDelay = `${idx * 0.1}s`;
    portFolio.append(char);
  });
};

const hScroll = () => {
  let top = project.getBoundingClientRect().top;
  let stickyTop = sticky.getBoundingClientRect().top;
  let scrollWidth = sticky.scrollWidth;
  let scrollHeight = project.scrollHeight - sticky.scrollHeight;
  let scrollPos = (scrollWidth / scrollHeight) * -top * 0.8;
  if (stickyTop < 1) {
    document.querySelector(".project1").classList.add("active");
    // projects.forEach((project) => {
    //   let left = project.offsetLeft;
    //   if (scrollPos > left - 100 && scrollPos < left + 100) {
    //     scrollPos = left;
    //   }
    // });
    sticky.scrollLeft = scrollPos;
  } else {
    document.querySelector(".project1").classList.remove("active");
    sticky.scrollLeft = 0;
  }
};

const toggleFadeProject = () => {
  projects.forEach((project) => {
    let left = project.getBoundingClientRect().left;
    if (left < window.innerWidth * 0.6) {
      if (!project.classList.contains("active")) {
        project.classList.add("active");
      }
    } else if (left > window.innerWidth * 0.8) {
      if (project.classList.contains("active")) {
        project.classList.remove("active");
      }
    }
  });
};

window.addEventListener("DOMContentLoaded", () => {
  animateText();
  toggleFadeProject();
});

window.onscroll = () => {
  let y = window.scrollY;
  let percent = (y / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = `${percent}%`;

  hScroll();
  toggleFadeProject();
};

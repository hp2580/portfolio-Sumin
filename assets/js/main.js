const scrollBar = document.querySelector(".scrollbar .bar"),
  portFolio = document.querySelector(".contentWrap h1"),
  project = document.querySelector(".projects"),
  sticky = document.querySelector(".stickyWrap"),
  projects = document.querySelectorAll(".project:not(:first-child)"),
  btnProjects = document.querySelectorAll(".btnMore"),
  modalWrap = document.querySelector(".modalProject"),
  modal = document.querySelector(".modal"),
  closeModal = document.querySelector(".modalClose");

const arrProject = [
  { name: "samsung", alt: "삼성재단", href: "Samsung" },
  { name: "daelim", alt: "대림바스", href: "Daelim" },
  { name: "hyundai", alt: "현대 IT&E", href: "Hyundai" },
  { name: "hPoint", alt: "H.Point", href: "H-Point" },
  { name: "selecto", alt: "셀렉토 커피", href: "Selecto" },
  { name: "sandbox", alt: "샌드박스", href: "Sandbox" },
];

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
    if (window.innerWidth <= 768) {
      projects.forEach((project) => {
        let left = project.offsetLeft;
        if (scrollPos > left - 100 && scrollPos < left + 100) {
          scrollPos = left;
        }
      });
    }
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

btnProjects.forEach((btn) => {
  btn.addEventListener("click", () => {
    let idx = btn.getAttribute("data-idx");
    let desc = btn.previousElementSibling;
    let img = document.querySelector(".modal img");
    let url = `assets/images/project_${arrProject[idx].name}.png`;
    let alt = arrProject[idx].alt;
    let href = `https://hp2580.github.io/Clone_${arrProject[idx].href}`;

    document.body.classList.add("hidden");
    modalWrap.classList.add("active");

    modal.prepend(desc.cloneNode(true));

    document.querySelector(".modal .link").setAttribute("href", href);

    img.setAttribute("src", url);
    img.setAttribute("alt", alt);
    img.onload = () => {
      document.querySelector(".modal .imgWrap").append(img);
    };
  });
});

closeModal.onclick = () => {
  let firstChild = Array.from(modal.children)[0].className;

  document.body.classList.remove("hidden");
  modalWrap.classList.remove("active");

  if (firstChild === "descWrap") {
    modal.removeChild(modal.firstElementChild);
  }
};

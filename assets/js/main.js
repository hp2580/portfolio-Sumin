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
  modalSlider = document.querySelectorAll(".modalReact .slider");

const arrProject = [
  { name: "samsung", alt: "삼성재단", href: "Samsung" },
  { name: "daelim", alt: "대림바스", href: "Daelim" },
  { name: "hyundai", alt: "현대 IT&E", href: "Hyundai" },
  { name: "hPoint", alt: "H.Point", href: "H-Point" },
  { name: "selecto", alt: "셀렉토 커피", href: "Selecto" },
  { name: "sandbox", alt: "샌드박스", href: "Sandbox" },
];

let pos = 0;

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
    // if (window.innerWidth <= 768) {
    //   projects.forEach((project) => {
    //     let left = project.offsetLeft;
    //     if (scrollPos > left - 100 && scrollPos < left + 100) {
    //       scrollPos = left;
    //     }
    //   });
    // }
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

const moveSlider = (pos) => {
  modalSlider.forEach((slider) => {
    slider.style.transform = `translateX(${pos}%)`;
  });
};

const checkDisable = () => {
  let prev = document.querySelector(".btnPrev"),
    next = document.querySelector(".btnNext");
  if (pos > -1) {
    prev.classList.add("disable");
  }
  if (pos < 0) {
    prev.classList.remove("disable");
  }

  if (pos < -100) {
    next.classList.add("disable");
  }
  if (pos > -200) {
    next.classList.remove("disable");
  }
};

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

btnProjects.forEach((btn) => {
  btn.addEventListener("click", () => {
    let idx = btn.getAttribute("data-idx");
    let desc = btn.previousElementSibling;
    let img = document.querySelector(".modal img");
    let url = `assets/images/project_${arrProject[idx].name}.png`;
    let alt = arrProject[idx].alt;
    let href = `https://hp2580.github.io/Clone_${arrProject[idx].href}`;

    document.body.classList.add("hidden");
    modalWrap_p.classList.add("active");

    modal_p.prepend(desc.cloneNode(true));

    document
      .querySelector(".modalProject .modal .link")
      .setAttribute("href", href);

    img.setAttribute("src", url);
    img.setAttribute("alt", alt);
    img.onload = () => {
      document.querySelector(".modal .imgWrap").append(img);
    };
  });
});

closeModal_p.onclick = () => {
  let firstChild = Array.from(modal_p.children)[0].className;

  document.body.classList.remove("hidden");
  modalWrap_p.classList.remove("active");

  if (firstChild === "descWrap") {
    modal_p.removeChild(modal_p.firstElementChild);
  }
};

slides.forEach((slide) => {
  slide.addEventListener("click", (e) => {
    let url = slide.getAttribute("data-url"),
      href = `https://hp2580.github.io/${url}`;

    e.preventDefault();
    document.body.classList.add("hidden");

    document.querySelector(".modalReact .link").setAttribute("href", href);

    checkDisable();

    if (slide.className === "slide_todo") {
      modalWrap_r.classList.add("active", "t");
    } else {
      modalWrap_r.classList.add("active", "m");
    }
  });
});

controlModal.forEach((control) => {
  control.onclick = () => {
    if (control.classList.contains("btnPrev")) {
      pos += 100;
    } else {
      pos -= 100;
    }
    moveSlider(pos);
    checkDisable();
  };
});

closeModal_r.onclick = () => {
  document.body.classList.remove("hidden");
  modalWrap_r.classList.remove("active", "t", "m");
  moveSlider((pos = 0));
  clearClass(controlModal, "disable");
};

const arrProject = [
  { name: "samsung", alt: "삼성재단", href: "Samsung" },
  { name: "daelim", alt: "대림바스", href: "Daelim" },
  { name: "hyundai", alt: "현대 IT&E", href: "Hyundai" },
  { name: "hPoint", alt: "H.Point", href: "H-Point" },
  { name: "selecto", alt: "셀렉토 커피", href: "Selecto" },
  { name: "sandbox", alt: "샌드박스", href: "Sandbox" },
];

let pos = 0;

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

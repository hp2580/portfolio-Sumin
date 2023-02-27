const hScroll = () => {
  let top = project.getBoundingClientRect().top;
  let stickyTop = sticky.getBoundingClientRect().top;
  let scrollWidth = sticky.scrollWidth;
  let scrollHeight = project.scrollHeight - sticky.scrollHeight;
  let scrollPos = (scrollWidth / scrollHeight) * -top * 0.8;
  if (stickyTop < 1) {
    document.querySelector(".project1").classList.add("active");
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

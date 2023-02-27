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

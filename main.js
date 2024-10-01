const cols = document.querySelectorAll(".col");

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type == "lock") {
    const icon = event.target;
    console.log(icon);
    icon.classList.toggle("fa-unlock-alt");
    icon.classList.toggle("fa-lock");
  }
  let popupTimer;

  if (type == "copy") {
    copyClick(event.target.textContent);
    const popup = document.querySelectorAll("#copy-popup")[0];
    document.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
    });
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.opacity = 1;

    clearInterval(popupTimer);

    popupTimer = setInterval(() => {
      popup.style.opacity = popup.style.opacity - 0.05;
      let topValue = parseInt(popup.style.top.replace(/[a-z]/gi, ""));
      topValue += 1;
      popup.style.top = topValue + "px";
      if (popup.style.opacity <= 0) {
        popup.style.opacity = 0;
        clearInterval(popupTimer);
        document.removeEventListener("mousemove", null);
        return;
      }
    }, 100);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code == "Space") {
    setColors();
  }
});

function copyClick(text) {
  return navigator.clipboard.writeText(text);
}

function generateRandomColor() {
  const hex = "0123456789ABCDEF";

  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return "#" + color;
}

function setColors(initial) {
  const colors = initial ? getColorsFromHash() : [];

  cols.forEach((col, i) => {
    const isLocked = col
      .querySelector("button")
      .querySelector("i")
      .classList.contains("fa-lock");
    console.log(isLocked);
    const text = col.querySelector("h2");
    const but = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    const hex = initial
      ? colors[i]
        ? colors[i]
        : generateRandomColor()
      : generateRandomColor();

    text.textContent = hex;
    if (!initial) {
      colors.push(hex);
    }
    setTextColor(text, hex, but);

    col.style.backgroundColor = hex;
  });

  updateHash(colors);
}

function setTextColor(text, color, button) {
  const lumunance = chroma(color).luminance();

  text.style.color = lumunance > 0.5 ? "#4F525B" : "white";
  button.style.color = lumunance > 0.5 ? "#4F525B" : "white";
}

function updateHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setColors(true);

document.querySelectorAll(".curtain-1")[0].addEventListener("click", () => {
  document.querySelectorAll(".curtain-1")[0].style.transform =
    "translateY(-100%)";
  document.querySelectorAll(".top-1")[0].style.transform = "translateY(100vh)";
});
document.querySelectorAll(".curtain-2")[0].addEventListener("click", () => {
  document.querySelectorAll(".curtain-2")[0].style.transform =
    "translateY(-100%)";
  document.querySelectorAll(".top-2")[0].style.transform = "translateY(100vh)";
});
document.querySelectorAll(".curtain-3")[0].addEventListener("click", () => {
  document.querySelectorAll(".curtain-3")[0].style.transform =
    "translateY(-100%)";
  document.querySelectorAll(".top-3")[0].style.transform = "translateY(100vh)";
});
document.querySelectorAll(".curtain-4")[0].addEventListener("click", () => {
  document.querySelectorAll(".curtain-4")[0].style.transform =
    "translateY(-100%)";
  document.querySelectorAll(".top-4")[0].style.transform = "translateY(100vh)";
});
document.querySelectorAll(".curtain-5")[0].addEventListener("click", () => {
  document.querySelectorAll(".curtain-5")[0].style.transform =
    "translateY(-100%)";
  document.querySelectorAll(".top-5")[0].style.transform = "translateY(100vh)";
});

document.querySelectorAll(".fa-arrow-up")[0].addEventListener("click", () => {
  document.querySelectorAll(".curtain-1")[0].style.transform = "none";
  document.querySelectorAll(".top-1")[0].style.transform = "translateY(-100vh)";
});
document.querySelectorAll(".fa-arrow-up")[1].addEventListener("click", () => {
  document.querySelectorAll(".curtain-2")[0].style.transform = "none";
  document.querySelectorAll(".top-2")[0].style.transform = "translateY(-100vh)";
});
document.querySelectorAll(".fa-arrow-up")[2].addEventListener("click", () => {
  document.querySelectorAll(".curtain-3")[0].style.transform = "none";
  document.querySelectorAll(".top-3")[0].style.transform = "translateY(-100vh)";
});
document.querySelectorAll(".fa-arrow-up")[3].addEventListener("click", () => {
  document.querySelectorAll(".curtain-4")[0].style.transform = "none";
  document.querySelectorAll(".top-4")[0].style.transform = "translateY(-100vh)";
});
document.querySelectorAll(".fa-arrow-up")[4].addEventListener("click", () => {
  document.querySelectorAll(".curtain-5")[0].style.transform = "none";
  document.querySelectorAll(".top-5")[0].style.transform = "translateY(-100vh)";
});

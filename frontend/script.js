document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector("img.lazyload");
  const highResSrc = img.getAttribute("data-src");

  const highResImage = new Image();
  highResImage.src = highResSrc;

  highResImage.onload = () => {
    img.src = highResSrc;
    img.style.filter = "none"; // remove blur once loaded
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const highResSrc = img.getAttribute("data-src");
          if (highResSrc) {
            const tempImg = new Image();
            tempImg.src = highResSrc;
            tempImg.onload = () => {
              img.src = highResSrc;
              img.classList.add("loaded"); // THIS is what allows CSS blur to go away
              img.removeAttribute("data-src");
              observer.unobserve(img);
            };
          }
        }
      });
    });

    lazyImages.forEach((img) => observer.observe(img));
  } else {
    lazyImages.forEach((img) => {
      const highResSrc = img.getAttribute("data-src");
      if (highResSrc) {
        img.src = highResSrc;
        img.classList.add("loaded");
        img.removeAttribute("data-src");
      }
    });
  }
});

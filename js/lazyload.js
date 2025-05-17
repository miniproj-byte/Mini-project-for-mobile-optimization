document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazy");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const highResSrc = img.getAttribute("data-src");
          if (highResSrc) {
            const temp = new Image();
            temp.src = highResSrc;
            temp.onload = () => {
              img.src = highResSrc;
              img.classList.add("loaded");
              img.removeAttribute("data-src");
              observer.unobserve(img);
              if (window.msnry) window.msnry.layout();
            };
          }
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    // fallback if no IntersectionObserver support
    lazyImages.forEach(img => {
      const highResSrc = img.getAttribute("data-src");
      if (highResSrc) {
        img.src = highResSrc;
        img.classList.add("loaded");
        img.removeAttribute("data-src");
      }
    });
  }
});

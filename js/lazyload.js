document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazy");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const img = entry.target;
        const highResSrc = img.dataset.src;

        if (highResSrc) {
          const tempImg = new Image();
          tempImg.src = highResSrc;

          tempImg.onload = () => {
            img.src = highResSrc;
            img.classList.add("loaded");
            img.removeAttribute("data-src");
            observer.unobserve(img);
            if (window.msnry) window.msnry.layout();
          };
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    // Fallback for unsupported browsers
    lazyImages.forEach(img => {
      const highResSrc = img.dataset.src;
      if (highResSrc) {
        img.src = highResSrc;
        img.classList.add("loaded");
        img.removeAttribute("data-src");
      }
    });
  }
});


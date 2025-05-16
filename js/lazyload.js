document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll('img.lazy');

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const highResSrc = img.getAttribute('data-src');
          if (highResSrc) {
            img.src = highResSrc;
            img.onload = () => {
              img.classList.add("loaded"); // ✅ This line is critical!
            };
            img.removeAttribute('data-src');
          }
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const imageData = [...Array(32)].map((_, i) => {
    const num = (i + 1).toString().padStart(2, "0");
    return {
      title: `Image ${num}`,
      lowRes: `assets/images/low/image${num}.webp`,
      highRes: `assets/images/high/image${num}.webp`,
      tags: i % 2 === 0 ? ["beach", "nature"] : ["mountains", "travel"]
    };
  });

  const gallery = document.getElementById("gallery");

  imageData.forEach(data => {
    const div = document.createElement("div");
    div.className = "grid-item";
    div.innerHTML = `
      <img 
        src="${data.lowRes}" 
        data-src="${data.highRes}" 
        alt="${data.tags.join(" ")}" 
        data-highres="${data.highRes}" 
        class="lazy blur" />
    `;
    gallery.appendChild(div);
  });

  // Masonry init
  const msnry = new Masonry(gallery, { itemSelector: ".grid-item", gutter: 10 });
  window.msnry = msnry;

  imagesLoaded(gallery, () => {
    msnry.layout();
  });

  // Lazy load
  const lazyImages = document.querySelectorAll("img.lazy");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const highRes = img.dataset.src;
        const temp = new Image();
        temp.src = highRes;
        temp.onload = () => {
          img.src = highRes;
          img.classList.add("loaded");
          img.classList.remove("blur");
          img.removeAttribute("data-src");
          observer.unobserve(img);
          msnry.layout();
        };
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));

  // Search + tag filter
  const searchInput = document.getElementById("search-bar");
  const checkboxContainer = document.getElementById("tags");
  const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');

  function filterImages() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedTags = [...checkboxes].filter(cb => cb.checked).map(cb => cb.value.toLowerCase());

    document.querySelectorAll("#gallery .grid-item").forEach(item => {
      const img = item.querySelector("img");
      const alt = img.alt.toLowerCase();
      const searchMatch = query === "" || alt.includes(query);
      const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => alt.includes(tag));
      item.style.display = searchMatch && tagMatch ? "" : "none";
    });

    msnry.layout();
  }

  searchInput.addEventListener("focus", () => {
    checkboxContainer.style.display = "block";
  });

  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      if (!checkboxContainer.contains(document.activeElement)) {
        checkboxContainer.style.display = "none";
      }
    }, 200);
  });

  searchInput.addEventListener("input", filterImages);
  checkboxes.forEach(cb => cb.addEventListener("change", filterImages));

  // Theme toggle
  const themeSwitch = document.getElementById("theme-switch");
  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeSwitch.checked);
  });

  // Popup viewer
  const popup = document.getElementById("popup");
  const popupImg = document.getElementById("popup-img");
  const spinner = document.getElementById("spinner");
  const closePopup = document.getElementById("close-popup");

  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img[data-highres]");
    if (!img) return;

    popup.classList.remove("hidden");
    spinner.style.display = "block";
    popupImg.style.display = "none";
    popupImg.src = "";

    const highRes = img.dataset.highres;
    const temp = new Image();
    temp.src = highRes;
    temp.onload = () => {
      popupImg.src = highRes;
      spinner.style.display = "none";
      popupImg.style.display = "block";
    };
  });

  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.add("hidden");
  });
});

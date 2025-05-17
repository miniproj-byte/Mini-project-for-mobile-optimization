document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const searchInput = document.getElementById("search-bar");
  const checkboxContainer = document.getElementById("tags");
  const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
  const popup = document.getElementById("popup");
  const popupImg = document.getElementById("popup-img");
  const spinner = document.getElementById("spinner");
  const closePopupBtn = document.getElementById("close-popup");
  const body = document.body;

  // Image data with tags & sources
  const imagesData = Array.from({ length: 32 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    const tagsPool = [
      ["beach", "travel"],
      ["nature", "mountains"],
      ["beach", "nature"],
      ["travel", "mountains"],
    ];
    const tags = tagsPool[i % tagsPool.length];
    return {
      id: num,
      alt: `${tags.join(" ")} image ${num}`,
      tags,
      lowRes: `assets/images/low-res/img${num}-low.webp`,
      highRes: `assets/images/high-res/img${num}-high.webp`,
    };
  });

  // Render gallery with images
  function renderGallery(images) {
    gallery.innerHTML = "";
    images.forEach(({ alt, lowRes, highRes }) => {
      const div = document.createElement("div");
      div.className = "grid-item";
      div.innerHTML = `<img class="lazy" src="${lowRes}" data-src="${highRes}" alt="${alt}">`;
      gallery.appendChild(div);
    });

    // Wait till images are loaded before Masonry layout init
    imagesLoaded(gallery, () => {
      window.msnry = new Masonry(gallery, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-item",
        gutter: 20,
        percentPosition: true,
      });
    });

    initLazyLoad();
  }

  // Intersection Observer for lazy loading
  function initLazyLoad() {
    const lazyImages = document.querySelectorAll(".lazy");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const highResSrc = img.dataset.src;
          if (highResSrc) {
            img.src = highResSrc;
            img.onload = () => img.classList.add("loaded");
            obs.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: "100px 0px",
      threshold: 0.1,
    });
    lazyImages.forEach(img => observer.observe(img));
  }

  // Filtering by search & tags
  function filterImages() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeTags = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    const filtered = imagesData.filter(({ tags }) => {
      if (activeTags.length && !activeTags.every(tag => tags.includes(tag))) return false;
      if (searchTerm) return tags.some(tag => tag.includes(searchTerm));
      return true;
    });

    renderGallery(filtered);
  }

  // Show/hide tags on focus/blur of search
  searchInput.addEventListener("focus", () => {
    checkboxContainer.style.display = "flex";
  });
  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      if (!document.activeElement.matches('input[type="checkbox"]')) {
        checkboxContainer.style.display = "none";
      }
    }, 150);
  });

  // Event listeners
  checkboxes.forEach(cb => cb.addEventListener("change", filterImages));
  searchInput.addEventListener("input", filterImages);

  // Theme toggle with localStorage
  const themeSwitch = document.getElementById("theme-switch");
  const savedTheme = localStorage.getItem("optipix-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeSwitch.checked = true;
  }
  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("optipix-theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("optipix-theme", "light");
    }
  });

  // Popup open with spinner until full res loads
  gallery.addEventListener("click", e => {
    const img = e.target.closest("img");
    if (!img) return;

    popup.classList.remove("hidden");
    spinner.style.display = "block";
    popupImg.style.display = "none";

    popupImg.src = img.dataset.src;
    popupImg.alt = img.alt;
  });

  popupImg.addEventListener("load", () => {
    spinner.style.display = "none";
    popupImg.style.display = "block";
  });

  // Close popup logic
  closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    popupImg.src = "";
  });

  // Also close popup when clicking outside the image
  popup.addEventListener("click", e => {
    if (e.target === popup) {
      popup.classList.add("hidden");
      popupImg.src = "";
    }
  });

  // Initial render
  renderGallery(imagesData);
});

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
        class="lazy blur" 
        loading="lazy"
      />
    `;
    gallery.appendChild(div);
  });

  // Reflow Masonry after images are loaded
  imagesLoaded(gallery, () => {
    window.msnry = new Masonry(gallery, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-item",
      gutter: 20,
      percentPosition: true
    });
  });

  // Lazy loading with IntersectionObserver
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
          observer.unobserve(img);
          if (window.msnry) window.msnry.layout();
        };
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));

  // Filter functionality
  const searchInput = document.getElementById("search-bar");
  const checkboxContainer = document.getElementById("tags");
  const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');

  function filterImages() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedTags = [...checkboxes]
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    document.querySelectorAll(".grid-item").forEach(item => {
      const alt = item.querySelector("img").alt.toLowerCase();
      const matchesSearch = alt.includes(searchTerm);
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => alt.includes(tag));
      item.style.display = matchesSearch && matchesTags ? "" : "none";
    });

    if (window.msnry) window.msnry.layout();
  }

  searchInput.addEventListener("focus", () => {
    checkboxContainer.style.display = "flex";
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
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeSwitch.checked = true;
  }
  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeSwitch.checked);
    localStorage.setItem("theme", themeSwitch.checked ? "dark" : "light");
  });
});

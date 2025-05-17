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
        class="lazy blur" />
    `;
    gallery.appendChild(div);
  });

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
        };
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));

  const searchInput = document.getElementById("search-bar");
  const checkboxContainer = document.getElementById("tags");
  const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');

function filterImages() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedTags = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  images.forEach(img => {
    const alt = img.alt.toLowerCase();

    const matchesSearch = alt.includes(searchValue);
    const matchesTags = selectedTags.length === 0 ? true : selectedTags.every(tag => alt.includes(tag));

    // Show only if matches search AND matches all selected tags
    img.closest('.grid-item').style.display = (matchesSearch && matchesTags) ? '' : 'none';
  });

  if (window.msnry) window.msnry.layout();
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

  const themeSwitch = document.getElementById("theme-switch");
  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeSwitch.checked);
  });
});

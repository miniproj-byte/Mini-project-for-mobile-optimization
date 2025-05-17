document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById('gallery');
  const totalImages = 32;

  // Generate gallery images dynamically
  const altTags = ['beach', 'travel', 'nature', 'mountains'];
  galleryContainer.innerHTML = [...Array(totalImages)].map((_, i) => {
    const imgNum = (i + 1).toString().padStart(2, '0');
    const alt = altTags[i % altTags.length] + ' image ' + imgNum;
    return `
      <div class="grid-item">
        <img
          class="lazy"
          src="assets/images/low-res/img${imgNum}-low.webp"
          data-src="assets/images/high-res/img${imgNum}-high.webp"
          alt="${alt}"
          loading="lazy"
        />
      </div>
    `;
  }).join('');

  // Initialize Masonry after images loaded
  imagesLoaded(galleryContainer, () => {
    window.msnry = new Masonry(galleryContainer, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-item',
      gutter: 20,
      percentPosition: true,
    });
    console.log("Masonry initialized");
  });

  // Lazy loading with debug logs
  const lazyImages = document.querySelectorAll("img.lazy");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const highResSrc = img.getAttribute("data-src");
          if (highResSrc) {
            console.log(`Loading high-res image: ${highResSrc}`);
            const temp = new Image();
            temp.src = highResSrc;
            temp.onload = () => {
              img.src = highResSrc;
              img.classList.add("loaded");
              img.removeAttribute("data-src");
              observer.unobserve(img);
              if (window.msnry) {
                window.msnry.layout();
                console.log("Masonry layout updated after image load");
              }
            };
            temp.onerror = () => {
              console.error(`Failed to load image: ${highResSrc}`);
            };
          }
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    // fallback
    lazyImages.forEach(img => {
      const highResSrc = img.getAttribute("data-src");
      if (highResSrc) {
        img.src = highResSrc;
        img.classList.add("loaded");
        img.removeAttribute("data-src");
      }
    });
  }

  // Search and filter
  const searchInput = document.getElementById('search-bar');
  const checkboxContainer = document.getElementById('tags');
  const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
  const images = document.querySelectorAll('.grid-item img');

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


  searchInput.addEventListener('input', filterImages);
  checkboxes.forEach(cb => cb.addEventListener('change', filterImages));

  // Show/hide tags on focus/blur with delay
  searchInput.addEventListener('focus', () => {
    checkboxContainer.style.display = 'flex';
  });
  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      if (document.activeElement.parentElement.parentElement !== checkboxContainer) {
        checkboxContainer.style.display = 'none';
      }
    }, 200);
  });

  // Theme toggle (light/dark)
  const toggle = document.getElementById("theme-switch");
  const body = document.body;
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggle.checked = true;
  }
  toggle.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
  });
});

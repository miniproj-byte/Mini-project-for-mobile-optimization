// Image data sample (replace with your actual images metadata)
const images = [
  {
    id: 1,
    title: "Mountain Sunrise",
    lowRes: "assets/images/mountain-low.jpg",
    highRes: "assets/images/mountain-high.jpg",
    tags: ["nature", "mountain", "sunrise"],
  },
  {
    id: 2,
    title: "City Lights",
    lowRes: "assets/images/city-low.jpg",
    highRes: "assets/images/city-high.jpg",
    tags: ["city", "night", "lights"],
  },
  // add your other images here...
];

// DOM elements
const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const tagFilters = document.getElementById("tagFilters");
const darkModeToggle = document.getElementById("darkModeToggle");

// Get unique tags from all images
const allTags = [...new Set(images.flatMap(img => img.tags))].sort();

// Render tag checkboxes dynamically
function renderTagCheckboxes() {
  tagFilters.innerHTML = "";
  allTags.forEach(tag => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" value="${tag}" /> ${tag}
    `;
    tagFilters.appendChild(label);
  });
}

// Render gallery items based on filtered images
function renderGallery(filteredImages) {
  gallery.innerHTML = "";
  filteredImages.forEach(({ id, title, lowRes, highRes }) => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.innerHTML = `
      <img 
        data-id="${id}"
        data-highres="${highRes}"
        src="${lowRes}"
        alt="${title}"
        loading="lazy"
      />
    `;
    gallery.appendChild(div);
  });
  observeImages();
}

// Intersection Observer for lazy loading high res & removing blur
let observer;
function observeImages() {
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const highResSrc = img.getAttribute("data-highres");

        if (!img.classList.contains("loaded")) {
          // preload high res image
          const highResImg = new Image();
          highResImg.src = highResSrc;
          highResImg.onload = () => {
            img.src = highResSrc;
            img.classList.add("loaded");
          };
        }

        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: "50px 0px",
    threshold: 0.01
  });

  document.querySelectorAll(".gallery-item img").forEach(img => observer.observe(img));
}

// Filter images by search text & checked tags
function filterImages() {
  const searchText = searchInput.value.trim().toLowerCase();
  const checkedTags = [...tagFilters.querySelectorAll("input[type=checkbox]:checked")].map(cb => cb.value);

  const filtered = images.filter(img => {
    // Check tags filter
    const tagMatch = checkedTags.length === 0 || checkedTags.some(tag => img.tags.includes(tag));
    // Check search input in tags
    const searchMatch =
      searchText === "" ||
      img.tags.some(tag => tag.toLowerCase().includes(searchText));

    return tagMatch && searchMatch;
  });

  renderGallery(filtered);
}

// Event listeners

// Show tag filters only when search bar focused
searchInput.addEventListener("focus", () => {
  tagFilters.classList.remove("hidden");
});
searchInput.addEventListener("blur", () => {
  // Delay hiding so clicks on checkboxes register
  setTimeout(() => {
    tagFilters.classList.add("hidden");
  }, 200);
});

// Filter gallery on input and tag checkbox change
searchInput.addEventListener("input", filterImages);
tagFilters.addEventListener("change", filterImages);

// Dark mode toggle
darkModeToggle.addEventListener("change", e => {
  document.body.classList.toggle("dark", e.target.checked);
});

// Initial setup
renderTagCheckboxes();
renderGallery(images);


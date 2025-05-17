// main.js

// Image data array (32 images)
const images = [
  { id: 1, title: "Sunset", lowRes: "assets/images/sunset-low.jpg", highRes: "assets/images/sunset-high.jpg", tags: ["sunset", "nature", "orange"] },
  { id: 2, title: "Cityscape", lowRes: "assets/images/city-low.jpg", highRes: "assets/images/city-high.jpg", tags: ["city", "urban", "night"] },
  { id: 3, title: "Mountain", lowRes: "assets/images/mountain-low.jpg", highRes: "assets/images/mountain-high.jpg", tags: ["mountain", "nature", "snow"] },
  { id: 4, title: "Beach", lowRes: "assets/images/beach-low.jpg", highRes: "assets/images/beach-high.jpg", tags: ["beach", "sand", "water"] },
  { id: 5, title: "Forest", lowRes: "assets/images/forest-low.jpg", highRes: "assets/images/forest-high.jpg", tags: ["forest", "trees", "green"] },
  { id: 6, title: "Desert", lowRes: "assets/images/desert-low.jpg", highRes: "assets/images/desert-high.jpg", tags: ["desert", "sand", "dry"] },
  { id: 7, title: "Waterfall", lowRes: "assets/images/waterfall-low.jpg", highRes: "assets/images/waterfall-high.jpg", tags: ["waterfall", "nature", "water"] },
  { id: 8, title: "Lake", lowRes: "assets/images/lake-low.jpg", highRes: "assets/images/lake-high.jpg", tags: ["lake", "water", "reflection"] },
  { id: 9, title: "Canyon", lowRes: "assets/images/canyon-low.jpg", highRes: "assets/images/canyon-high.jpg", tags: ["canyon", "rocks", "nature"] },
  { id: 10, title: "Flowers", lowRes: "assets/images/flowers-low.jpg", highRes: "assets/images/flowers-high.jpg", tags: ["flowers", "nature", "colorful"] },
  { id: 11, title: "Snowfield", lowRes: "assets/images/snowfield-low.jpg", highRes: "assets/images/snowfield-high.jpg", tags: ["snow", "white", "cold"] },
  { id: 12, title: "Night Sky", lowRes: "assets/images/nightsky-low.jpg", highRes: "assets/images/nightsky-high.jpg", tags: ["night", "stars", "sky"] },
  { id: 13, title: "River", lowRes: "assets/images/river-low.jpg", highRes: "assets/images/river-high.jpg", tags: ["river", "water", "nature"] },
  { id: 14, title: "Valley", lowRes: "assets/images/valley-low.jpg", highRes: "assets/images/valley-high.jpg", tags: ["valley", "green", "nature"] },
  { id: 15, title: "Island", lowRes: "assets/images/island-low.jpg", highRes: "assets/images/island-high.jpg", tags: ["island", "water", "tropical"] },
  { id: 16, title: "Cliff", lowRes: "assets/images/cliff-low.jpg", highRes: "assets/images/cliff-high.jpg", tags: ["cliff", "rocks", "nature"] },
  { id: 17, title: "Bridge", lowRes: "assets/images/bridge-low.jpg", highRes: "assets/images/bridge-high.jpg", tags: ["bridge", "city", "structure"] },
  { id: 18, title: "Fields", lowRes: "assets/images/fields-low.jpg", highRes: "assets/images/fields-high.jpg", tags: ["fields", "green", "nature"] },
  { id: 19, title: "Foggy Forest", lowRes: "assets/images/foggyforest-low.jpg", highRes: "assets/images/foggyforest-high.jpg", tags: ["fog", "forest", "mystic"] },
  { id: 20, title: "Castle", lowRes: "assets/images/castle-low.jpg", highRes: "assets/images/castle-high.jpg", tags: ["castle", "historic", "architecture"] },
  { id: 21, title: "Road", lowRes: "assets/images/road-low.jpg", highRes: "assets/images/road-high.jpg", tags: ["road", "city", "urban"] },
  { id: 22, title: "Garden", lowRes: "assets/images/garden-low.jpg", highRes: "assets/images/garden-high.jpg", tags: ["garden", "flowers", "green"] },
  { id: 23, title: "Skyline", lowRes: "assets/images/skyline-low.jpg", highRes: "assets/images/skyline-high.jpg", tags: ["skyline", "city", "urban"] },
  { id: 24, title: "Swamp", lowRes: "assets/images/swamp-low.jpg", highRes: "assets/images/swamp-high.jpg", tags: ["swamp", "water", "green"] },
  { id: 25, title: "Volcano", lowRes: "assets/images/volcano-low.jpg", highRes: "assets/images/volcano-high.jpg", tags: ["volcano", "nature", "fire"] },
  { id: 26, title: "Windmill", lowRes: "assets/images/windmill-low.jpg", highRes: "assets/images/windmill-high.jpg", tags: ["windmill", "rural", "structure"] },
  { id: 27, title: "Harbor", lowRes: "assets/images/harbor-low.jpg", highRes: "assets/images/harbor-high.jpg", tags: ["harbor", "boats", "water"] },
  { id: 28, title: "Meadow", lowRes: "assets/images/meadow-low.jpg", highRes: "assets/images/meadow-high.jpg", tags: ["meadow", "grass", "nature"] },
  { id: 29, title: "Sunrise", lowRes: "assets/images/sunrise-low.jpg", highRes: "assets/images/sunrise-high.jpg", tags: ["sunrise", "nature", "orange"] },
  { id: 30, title: "Water Lilies", lowRes: "assets/images/waterlilies-low.jpg", highRes: "assets/images/waterlilies-high.jpg", tags: ["water", "flowers", "nature"] },
  { id: 31, title: "Autumn Leaves", lowRes: "assets/images/autumn-low.jpg", highRes: "assets/images/autumn-high.jpg", tags: ["autumn", "leaves", "orange"] },
  { id: 32, title: "Glacier", lowRes: "assets/images/glacier-low.jpg", highRes: "assets/images/glacier-high.jpg", tags: ["glacier", "snow", "ice"] },
];

// Grab DOM elements
const gallery = document.getElementById('gallery');
const searchBar = document.getElementById('search-bar');
const tagsContainer = document.getElementById('tags');
const themeToggle = document.getElementById('toggle-theme');

let activeTags = new Set();

// Generate sorted unique tags for filtering
const allTags = [...new Set(images.flatMap(img => img.tags))].sort();

// Build tag checkbox elements
function createTagCheckbox(tag) {
  const label = document.createElement('label');
  label.textContent = tag;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = tag;

  checkbox.addEventListener('change', () => {
    checkbox.checked ? activeTags.add(tag) : activeTags.delete(tag);
    renderGallery();
  });

  label.prepend(checkbox);
  return label;
}

// Append tag checkboxes to container
function setupTags() {
  allTags.forEach(tag => {
    tagsContainer.appendChild(createTagCheckbox(tag));
  });
}

// Create img element with low-res src + lazy load data
function createImageElement(imgData) {
  const img = document.createElement('img');
  img.alt = imgData.title;
  img.src = imgData.lowRes;
  img.dataset.highRes = imgData.highRes;
  img.dataset.tags = imgData.tags.join(',');
  img.classList.add('lazy'); // for lazy loading + blur effect
  return img;
}

// Clear gallery HTML
function clearGallery() {
  gallery.innerHTML = '';
}

// Filter images by search text & active tags
function filterImages() {
  const searchText = searchBar.value.trim().toLowerCase();

  return images.filter(img => {
    const matchesSearch = !searchText || img.tags.some(tag => tag.toLowerCase().includes(searchText));
    const matchesTags = activeTags.size === 0 || [...activeTags].every(tag => img.tags.includes(tag));
    return matchesSearch && matchesTags;
  });
}

// Render filtered images
function renderGallery() {
  clearGallery();

  const filtered = filterImages();

  if (filtered.length === 0) {
    gallery.innerHTML = <p style="grid-column: span 2; font-style: italic;">No images found.</p>;
    return;
  }

  filtered.forEach(imgData => {
    const img = createImageElement(imgData);
    gallery.appendChild(img);
    lazyLoadImage(img);
  });
}

// Lazy loading logic using IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const img = entry.target;
    const highResSrc = img.dataset.highRes;
    if (!highResSrc) return;

    const highResImg = new Image();
    highResImg.src = highResSrc;
    highResImg.onload = () => {
      img.src = highResSrc;
      img.classList.add('loaded');
      img.classList.remove('lazy');
    };

    observer.unobserve(img);
  });
}, {
  rootMargin: "100px",
  threshold: 0.1
});

// Start observing img for lazy loading
function lazyLoadImage(img) {
  observer.observe(img);
}

// Show tags on search focus, hide on blur (with small delay to allow clicks)
searchBar.addEventListener('focus', () => {
  tagsContainer.style.display = 'flex';
});

searchBar.addEventListener('blur', () => {
  setTimeout(() => {
    tagsContainer.style.display = 'none';
  }, 200); // Delay allows clicking checkboxes
});

// Re-render gallery on search input
searchBar.addEventListener('input', renderGallery);

// Initial setup
setupTags();
renderGallery();
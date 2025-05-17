const searchInput = document.getElementById('search-bar');
const checkboxContainer = document.getElementById('tags');
const checkboxes = checkboxContainer?.querySelectorAll('input[type="checkbox"]');
const images = document.querySelectorAll('img');

function filterImages() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedTags = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  images.forEach(img => {
    const altText = img.alt.toLowerCase();
    const matchesSearch = altText.includes(searchValue);
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => altText.includes(tag));

    // Show or hide image based on match
    const wrapper = img.closest('.grid-item');
    if (wrapper) {
      wrapper.style.display = (matchesSearch && matchesTags) ? '' : 'none';
    }
  });

  // Re-layout Masonry after filtering
  if (window.msnry) window.msnry.layout();
}

// Event listeners
searchInput?.addEventListener('input', filterImages);
checkboxes?.forEach(cb => cb.addEventListener('change', filterImages));

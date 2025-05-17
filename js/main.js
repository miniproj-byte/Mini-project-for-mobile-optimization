const searchInput = document.getElementById('search-bar');
const checkboxContainer = document.getElementById('tags');
const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');

function filterImages() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedTags = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  const images = document.querySelectorAll('img.lazy');
  images.forEach(img => {
    const alt = img.alt.toLowerCase();
    const searchMatch = alt.includes(searchValue);
    const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => alt.includes(tag));
    img.closest('.grid-item').style.display = (searchMatch && tagMatch) ? '' : 'none';
  });

  if (window.msnry) window.msnry.layout();
}

searchInput.addEventListener('input', filterImages);
checkboxes.forEach(cb => cb.addEventListener('change', filterImages));

// Tag visibility on search bar focus
searchInput.addEventListener('focus', () => {
  checkboxContainer.classList.add('visible');
});

document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !checkboxContainer.contains(e.target)) {
    checkboxContainer.classList.remove('visible');
  }
});
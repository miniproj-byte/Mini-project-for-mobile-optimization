const searchInput = document.getElementById('search-bar');
const checkboxContainer = document.getElementById('tags');
const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
const images = document.querySelectorAll('img');

function filterImages() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedTags = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  images.forEach(img => {
    const alt = img.alt.toLowerCase();
    const searchMatch = alt.includes(searchValue);
    const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => alt.includes(tag));
    img.parentElement.style.display = (searchMatch && tagMatch) ? '' : 'none';
  });
}

searchInput.addEventListener('input', filterImages);
checkboxes.forEach(cb => cb.addEventListener('change', filterImages));


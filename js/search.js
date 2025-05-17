const searchInput = document.getElementById('search-bar');
const checkboxContainer = document.getElementById('tags');
const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
const images = document.querySelectorAll('img.lazy');

checkboxContainer.style.display = 'none';

function filterImages() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedTags = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

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

searchInput.addEventListener('focus', () => {
  checkboxContainer.style.display = 'flex';
});

searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    if (!checkboxContainer.matches(':hover')) {
      checkboxContainer.style.display = 'none';
    }
  }, 150);
});

checkboxContainer.addEventListener('mousedown', e => {
  e.preventDefault(); // prevents blur hiding when clicking on tags
});

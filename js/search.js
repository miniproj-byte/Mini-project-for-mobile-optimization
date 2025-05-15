document.addEventListener('DOMContentLoaded', () => {
  // Get all the filter checkboxes
  const checkboxes = document.querySelectorAll('.tag-filter');

  // Get the search bar input element
  const searchInput = document.getElementById('search-bar');

  // Get all image cards
  const imageCards = document.querySelectorAll('.image-card');

  // Get the checkbox container to toggle visibility
  const checkboxContainer = document.getElementById('checkbox-container');

  // Function to filter images based on search input and selected tags
  function filterImages() {
    // Collect all selected tags from checkboxes
    const selectedTags = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    // Get the query from the search input
    const query = searchInput.value.toLowerCase();

    imageCards.forEach(card => {
      // Get tags from data-tags attribute
      const tags = card.getAttribute('data-tags')
        .toLowerCase()
        .split(',');

      // Check if query matches any tag or title
      const matchesQuery = query === "" || tags.some(tag => tag.includes(query));

      // Check if all selected tags are present in this image's tags
      const matchesTags = selectedTags.every(tag => tags.includes(tag));

      // Show/hide card based on both checks
      if (matchesQuery && matchesTags) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Listen for changes on checkboxes and search input
  checkboxes.forEach(cb => cb.addEventListener('change', filterImages));
  searchInput.addEventListener('input', filterImages);

  // Show checkboxes when search bar is focused
  searchInput.addEventListener('focus', () => {
    checkboxContainer.style.display = 'flex';
  });

  // Optional: Hide checkboxes when clicking outside (with a short delay)
  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      checkboxContainer.style.display = 'none';
    }, 200); // Delay to allow click on checkboxes
  });
});

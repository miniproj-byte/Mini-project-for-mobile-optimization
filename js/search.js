document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-bar');          // Grab the search bar element
  const checkboxContainer = document.getElementById('checkbox-container');  // Grab the div holding the checkbox
  const exactMatchCheckbox = document.getElementById('exact-match');  // Grab the exact match checkbox
  const imageCards = document.querySelectorAll('.image-card');        // Get all image cards in the gallery

  // When the user clicks/focuses on the search bar, show the checkbox container
  searchInput.addEventListener('focus', () => {
    checkboxContainer.style.display = 'block';
  });

  // Every time the user types in the search bar
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();          // Convert search input to lowercase
    const exactMatch = exactMatchCheckbox.checked;          // Check if the "Exact Match" box is ticked

    imageCards.forEach(card => {
      const tags = card.getAttribute('data-tags').toLowerCase();   // Get the tags for this image (also lowercase)

      // Decide if this card matches the search:
      // - If exactMatch is true, split tags and check if any exactly equals query
      // - Otherwise, check if query is a substring of tags
      const match = exactMatch ? tags.split(',').includes(query) : tags.includes(query);

      // Show the image if it matches OR if query is empty (no filter)
      // Hide it if it doesn't match
      card.style.display = match || query === '' ? 'block' : 'none';
    });
  });
});


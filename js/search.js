document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-bar");
  const tagCheckboxes = document.querySelectorAll("#tags input[type='checkbox']");
  const images = document.querySelectorAll(".gallery img");

  function filterImages() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedTags = Array.from(tagCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    images.forEach(img => {
      const alt = img.alt.toLowerCase();
      const matchesSearch = !searchText || alt.includes(searchText);
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => alt.includes(tag));
      img.style.display = (matchesSearch && matchesTags) ? "" : "none";
    });
  }

  searchInput.addEventListener("input", filterImages);
  tagCheckboxes.forEach(cb => cb.addEventListener("change", filterImages));
});

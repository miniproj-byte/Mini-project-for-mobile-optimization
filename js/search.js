document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-bar");
  const tagCheckboxes = document.querySelectorAll("#tags input[type='checkbox']");
  const items = document.querySelectorAll(".grid-item");

  function filterImages() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedTags = Array.from(tagCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    items.forEach(item => {
      const alt = item.querySelector("img").alt.toLowerCase();
      const matchesSearch = !searchText || alt.includes(searchText);
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => alt.includes(tag));
      item.style.display = (matchesSearch && matchesTags) ? "" : "none";
    });

    if (window.msnry) {
      window.msnry.layout();
    }
  }

  searchInput.addEventListener("input", filterImages);
  tagCheckboxes.forEach(cb => cb.addEventListener("change", filterImages));
});

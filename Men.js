document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.getElementById('product-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const sortDropdown = document.getElementById('sort-dropdown');
    const productCountElement = document.getElementById('product-count');

    // Filter functionality
    function applyFilters() {
        const activeTypeFilters = Array.from(document.querySelectorAll('input[data-filter="type"]:checked'))
            .map(checkbox => checkbox.value);
        const activeSizeFilters = Array.from(document.querySelectorAll('input[data-filter="size"]:checked'))
            .map(checkbox => checkbox.value);

        let visibleCount = 0;
        productCards.forEach(card => {
            const passesTypeFilter = activeTypeFilters.length === 0 || 
                activeTypeFilters.includes(card.dataset.type);
            const passesSizeFilter = activeSizeFilters.length === 0 || 
                activeSizeFilters.includes(card.dataset.size);

            if (passesTypeFilter && passesSizeFilter) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Update product count
        productCountElement.textContent = `Total ${visibleCount} / 141 items`;
    }

    // Sorting functionality
    function sortProducts(sortBy) {
        const sortedCards = productCards.sort((a, b) => {
            switch(sortBy) {
                case 'price-low':
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                case 'price-high':
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                case 'name-asc':
                    return a.dataset.name.localeCompare(b.dataset.name);
                case 'name-desc':
                    return b.dataset.name.localeCompare(a.dataset.name);
                default:
                    return 0;
            }
        });

        // Remove existing cards and re-append sorted cards
        productGrid.innerHTML = '';
        sortedCards.forEach(card => productGrid.appendChild(card));

        // Reapply filters after sorting
        applyFilters();
    }

    // Add event listeners to checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Add event listener to sort dropdown
    sortDropdown.addEventListener('change', function() {
        sortProducts(this.value);
    });

    // Load More Items functionality (placeholder)
    document.querySelector('.load-more').addEventListener('click', function() {
        alert('More items would be loaded here in a real application');
    });
});

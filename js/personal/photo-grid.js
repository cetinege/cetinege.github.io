/*
    PHOTO GRID (personal.html)
    Renders the photography section from PHOTOS and wires up the filters
    and the lightbox.

    Load after photo-data.js, photo-helpers.js, photo-filters.js and lightbox.js.
*/

(() => {
    // How many photos the preview grid shows; the rest live on gallery.html
    const PREVIEW_LIMIT = 12;

    const section = document.getElementById('photography');
    const grid = section.querySelector('.photo-grid');
    const count = section.querySelector('.photo-count');
    const noResults = section.querySelector('.no-results');

    // Photos passing the current filters. The lightbox browses this list.
    let visiblePhotos = PHOTOS;

    const lightbox = createLightbox(
        document.querySelector('.lightbox'),
        () => visiblePhotos
    );

    const filters = createPhotoFilters(section, render);

    function render() {
        visiblePhotos = filters.apply(PHOTOS);

        const cards = visiblePhotos
            .slice(0, PREVIEW_LIMIT)
            .map((photo, index) => fillPhotoCard(createPhotoCard(), photo, index));

        grid.replaceChildren(...cards);

        const total = visiblePhotos.length;
        count.textContent = `${total} ${total === 1 ? 'PHOTO' : 'PHOTOS'}`;
        noResults.hidden = total > 0;
    }

    // One listener on the grid instead of one per card
    grid.addEventListener('click', (event) => {
        const card = event.target.closest('.photo-card');
        if (card) {
            lightbox.open(Number(card.dataset.index));
        }
    });

    render();
})();
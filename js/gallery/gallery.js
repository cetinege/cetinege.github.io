/*
    GALLERY (gallery.html)
    Wires the page together: the filters, the photo count, the canvas
    view, the paged grid view, the canvas/grid switch and the lightbox.

    Load after photo-data.js, photo-helpers.js, photo-filters.js,
    lightbox.js and infinite-canvas.js.
*/

/*
    A grid that shows pageSize photos at a time, with a "Load more"
    button for the rest, so the page never builds hundreds of cards at once.

    Returns { setPhotos } to start again from page one with a new list.
*/
function createPagedGrid(container, { photos, onSelect, pageSize = 24 }) {
    const grid = container.querySelector('.photo-grid');
    const loadMoreButton = container.querySelector('.load-more-btn');
    let shownCount = 0;

    function showNextPage() {
        const nextPhotos = photos.slice(shownCount, shownCount + pageSize);

        const cards = nextPhotos.map((photo, i) =>
            fillPhotoCard(createPhotoCard(), photo, shownCount + i)
        );
        grid.append(...cards);

        shownCount += nextPhotos.length;
        loadMoreButton.hidden = shownCount >= photos.length;
    }

    function setPhotos(newPhotos) {
        photos = newPhotos;
        shownCount = 0;
        grid.replaceChildren();
        showNextPage();
    }

    loadMoreButton.addEventListener('click', showNextPage);

    grid.addEventListener('click', (event) => {
        const card = event.target.closest('.photo-card');
        if (card) {
            onSelect(Number(card.dataset.index));
        }
    });

    showNextPage();

    return { setPhotos };
}


(() => {
    const toolbar = document.querySelector('.gallery-toolbar');
    const count = toolbar.querySelector('.gallery-count');
    const canvasView = document.getElementById('canvas-view');
    const gridView = document.getElementById('grid-view');
    const emptyMessage = document.querySelector('.gallery-empty');
    const viewButtons = document.querySelectorAll('[data-view-button]');

    // Photos passing the current filters. Both views and the lightbox use this list.
    let visiblePhotos = PHOTOS;

    const lightbox = createLightbox(document.querySelector('.lightbox'), () => visiblePhotos);

    const canvas = createInfiniteCanvas(canvasView, { photos: visiblePhotos, onSelect: lightbox.open });
    const pagedGrid = createPagedGrid(gridView, { photos: visiblePhotos, onSelect: lightbox.open });

    const filters = createPhotoFilters(toolbar, applyFilters);


    // --- FILTERS ---

    function updateCount() {
        const noun = PHOTOS.length === 1 ? 'PHOTOGRAPH' : 'PHOTOGRAPHS';

        count.textContent = filters.isFiltering()
            ? `${visiblePhotos.length} OF ${PHOTOS.length} ${noun}`
            : `${PHOTOS.length} ${noun}`;
    }

    function applyFilters() {
        visiblePhotos = filters.apply(PHOTOS);

        canvas.setPhotos(visiblePhotos);
        pagedGrid.setPhotos(visiblePhotos);

        emptyMessage.hidden = visiblePhotos.length > 0;
        updateCount();
    }


    // --- VIEW SWITCH ---

    // view is 'canvas' or 'grid'
    function setView(view) {
        document.body.dataset.view = view;
        canvasView.hidden = view !== 'canvas';
        gridView.hidden = view !== 'grid';

        viewButtons.forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.viewButton === view));
        });

        window.scrollTo(0, 0);
    }

    viewButtons.forEach((button) => {
        button.addEventListener('click', () => setView(button.dataset.viewButton));
    });

    updateCount();
})();
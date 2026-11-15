/*
    PHOTO FILTERS
    Shared by personal.html and gallery.html. Load after photo-data.js.

    Builds one dropdown per entry in PHOTO_FILTERS, and handles the
    Filter toggle and the Reset button.

    Expects this markup somewhere inside `container`:
        <button class="filter-toggle" aria-controls="...">
        <div class="filter-panel" hidden>
            <div class="filter-panel-footer">
                <button class="filter-reset">
            </div>
        </div>

    Usage:
        const filters = createPhotoFilters(container, () => {
            const visible = filters.apply(PHOTOS);
            ...re-render with visible...
        });

    onChange is called whenever a dropdown changes or the filters are reset.
*/

function createPhotoFilters(container, onChange) {
    const toggle = container.querySelector('.filter-toggle');
    const panel = container.querySelector('.filter-panel');
    const footer = panel.querySelector('.filter-panel-footer');
    const resetButton = panel.querySelector('.filter-reset');

    // --- BUILD THE DROPDOWNS ---

    function createField({ field, label, options }) {
        const id = `filter-${field}`;

        const wrapper = document.createElement('div');
        wrapper.className = 'filter-field';

        const labelElement = document.createElement('label');
        labelElement.htmlFor = id;
        labelElement.textContent = label;

        const select = document.createElement('select');
        select.id = id;
        select.dataset.filter = field;

        Object.entries(options).forEach(([value, text]) => {
            select.append(new Option(text, value));
        });

        wrapper.append(labelElement, select);
        return wrapper;
    }

    // Inserted before the footer so Reset stays on its own row at the bottom
    footer.before(...PHOTO_FILTERS.map(createField));

    const selects = [...panel.querySelectorAll('select[data-filter]')];


    // --- MATCHING ---

    // e.g. { gear: 'film', subject: 'all', collections: 'travel', tone: 'all' }
    function getActiveFilters() {
        return Object.fromEntries(
            selects.map((select) => [select.dataset.filter, select.value])
        );
    }

    // A photo matches when every filter is 'all' or matches its field.
    // Array fields (collections) match if they contain the value.
    function matchesFilters(photo, filters) {
        return Object.entries(filters).every(([field, value]) => {
            if (value === 'all') return true;

            const photoValue = photo[field];
            return Array.isArray(photoValue)
                ? photoValue.includes(value)
                : photoValue === value;
        });
    }

    // Returns the photos passing the current filters
    function apply(photos) {
        const filters = getActiveFilters();
        return photos.filter((photo) => matchesFilters(photo, filters));
    }

    function isFiltering() {
        return selects.some((select) => select.value !== 'all');
    }


    // --- EVENTS ---

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        panel.hidden = isOpen;
    });

    selects.forEach((select) => select.addEventListener('change', onChange));

    resetButton.addEventListener('click', () => {
        selects.forEach((select) => { select.value = 'all'; });
        onChange();
    });

    return { apply, isFiltering };
}
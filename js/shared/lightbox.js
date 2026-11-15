/*
    LIGHTBOX
    Shared by personal.html and gallery.html. Load after photo-helpers.js.

    Uses the native <dialog> element, which gives us for free:
      - Escape to close
      - focus kept inside the lightbox while it is open
      - focus returned to the photo that opened it

    Usage:
        const lightbox = createLightbox(dialogElement, () => photosToBrowse);
        lightbox.open(index);

    getPhotos is a function rather than an array so the lightbox always
    browses the current list, e.g. only the photos passing the filters.
*/

function createLightbox(dialog, getPhotos) {
    const image = dialog.querySelector('.lightbox-image');
    const title = dialog.querySelector('.lightbox-title');

    let currentIndex = 0;

    // Keeps an index inside 0..length-1, so "next" on the last photo goes to the first
    function wrapIndex(index, length) {
        return ((index % length) + length) % length;
    }

    function show(index) {
        const photos = getPhotos();
        if (!photos.length) return;

        currentIndex = wrapIndex(index, photos.length);
        const photo = photos[currentIndex];

        image.src = fullSrc(photo);
        image.alt = photoAlt(photo);
        title.textContent = `${photo.title} — ${photo.date}`;

        // Start loading the neighbours so arrowing through feels instant
        [currentIndex - 1, currentIndex + 1].forEach((neighbour) => {
            new Image().src = fullSrc(photos[wrapIndex(neighbour, photos.length)]);
        });
    }

    function open(index) {
        show(index);

        if (!dialog.open) {
            dialog.showModal();
        }
    }

    // One listener for the buttons and for clicks on the dark area around the photo
    dialog.addEventListener('click', (event) => {
        const action = event.target.closest('[data-action]')?.dataset.action;

        if (action === 'close' || event.target === dialog) {
            dialog.close();
        } else if (action === 'prev') {
            show(currentIndex - 1);
        } else if (action === 'next') {
            show(currentIndex + 1);
        }
    });

    dialog.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') show(currentIndex - 1);
        if (event.key === 'ArrowRight') show(currentIndex + 1);
    });

    // Stop the large image downloading in the background once closed
    dialog.addEventListener('close', () => {
        image.removeAttribute('src');
    });

    return { open };
}
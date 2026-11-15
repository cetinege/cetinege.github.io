/*
    PHOTO HELPERS
    Small functions shared by every page that shows photos.
    Load after photo-data.js.
*/

const PHOTO_DIR = "assets/gallery-pictures";

function photoSrc(photo) {
    return `${PHOTO_DIR}/${photo.folder}/${photo.id}.jpg`;
}

// No separate thumbnails yet, so the grid and the lightbox use the same file
function thumbSrc(photo) {
    return photoSrc(photo);
}

function fullSrc(photo) {
    return photoSrc(photo);
}

function photoAlt(photo) {
    return photo.alt || photo.title;
}

function isFavourite(photo) {
    return photo.collections.includes('favourites');
}


/*
    Creates an empty photo card. Fill it with fillPhotoCard().

    Kept as two steps so the gallery canvas can recycle the same
    card for a different photo without rebuilding it.
*/
function createPhotoCard() {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'photo-card';

    // Static markup only: titles are set with textContent below, never as HTML
    card.innerHTML = `
        <img alt="" width="600" height="750" loading="lazy" decoding="async" draggable="false">
        <svg class="photo-favourite" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="m12 20-7-7a4 4 0 0 1 7-4 4 4 0 0 1 7 4Z"/>
        </svg>
        <span class="photo-caption">
            <span class="photo-title"></span>
            <span class="photo-date"></span>
        </span>
    `;

    const img = card.querySelector('img');
    img.addEventListener('load', () => img.classList.add('is-loaded'));

    return card;
}


/*
    Puts a photo into a card.
    index is stored on the card so a click can tell the lightbox which photo to open.
*/
function fillPhotoCard(card, photo, index) {
    const img = card.querySelector('img');
    const src = thumbSrc(photo);

    // Only swap the image if it changed, so a recycled card doesn't flicker
    if (img.getAttribute('src') !== src) {
        img.classList.remove('is-loaded');
        img.src = src;
    }

    img.alt = photoAlt(photo);
    card.querySelector('.photo-title').textContent = photo.title;
    card.querySelector('.photo-date').textContent = photo.date;
    card.querySelector('.photo-favourite').hidden = !isFavourite(photo);

    card.dataset.index = index;
    card.setAttribute('aria-label', `View "${photo.title}", ${photo.date}`);

    return card;
}
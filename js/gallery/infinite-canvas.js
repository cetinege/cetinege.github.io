/*
    INFINITE CANVAS (gallery.html)

    An endless, pannable wall of photos.

    Only the tiles currently on screen exist in the DOM. Panning moves a
    single transform on the plane, and tiles that leave the screen are
    hidden and reused for tiles entering it. So the DOM size depends on
    the screen size, not on how many photos there are.

    Usage:
        const canvas = createInfiniteCanvas(containerElement, {
            photos: PHOTOS,
            onSelect: (index) => { ... },   // called when a tile is clicked
        });

        canvas.setPhotos(filteredPhotos);   // e.g. after the filters change

    Load after photo-helpers.js.
*/

function createInfiniteCanvas(container, { photos, onSelect }) {
    const plane = container.querySelector('.canvas-plane');
    const hint = container.querySelector('.canvas-hint');

    // --- SETTINGS ---

    const TILE_WIDTH = 240;
    const TILE_HEIGHT = TILE_WIDTH * 5 / 4;     // matches the 4:5 photo cards
    const GAP = 12;
    const CELL_WIDTH = TILE_WIDTH + GAP;
    const CELL_HEIGHT = TILE_HEIGHT + GAP;

    const DRAG_THRESHOLD = 4;       // px of movement before a press counts as a drag
    const FRICTION = 0.93;          // how quickly a flick slows down (closer to 1 = longer glide)
    const MIN_VELOCITY = 0.4;       // below this the glide stops
    const KEY_STEP = 140;           // px per arrow key press (x3 with Shift)
    const HINT_TIMEOUT = 6000;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    plane.style.setProperty('--tile-width', `${TILE_WIDTH}px`);


    // --- STATE ---

    // Start slightly offset so the grid doesn't line up with the corner
    let offsetX = -CELL_WIDTH * 0.35;
    let offsetY = -CELL_HEIGHT * 0.25;
    let velocityX = 0;
    let velocityY = 0;

    const activeTiles = new Map();  // "col,row" -> tile element
    const spareTiles = [];          // hidden tiles waiting to be reused

    let renderFrame = null;
    let glideFrame = null;
    let pointer = null;             // the press currently in progress, if any
    let justDragged = false;


    // --- TILES ---

    // Picks a photo for each grid cell. Deterministic, so a cell always shows
    // the same photo, but scattered so the repeat isn't an obvious pattern.
    function photoIndexAt(col, row) {
        let hash = Math.imul(col, 73856093) ^ Math.imul(row, 19349663);
        hash = (hash ^ (hash >>> 13)) >>> 0;
        return hash % photos.length;
    }

    function takeTile() {
        const tile = spareTiles.pop();
        if (tile) {
            tile.hidden = false;
            return tile;
        }

        const newTile = createPhotoCard();
        newTile.classList.add('canvas-tile');
        plane.append(newTile);
        return newTile;
    }

    function releaseTile(key, tile) {
        tile.hidden = true;
        activeTiles.delete(key);
        spareTiles.push(tile);
    }


    // --- RENDERING ---

    function render() {
        renderFrame = null;

        // Nothing to show (e.g. the filters match no photos)
        if (!photos.length) {
            activeTiles.forEach((tile, key) => releaseTile(key, tile));
            return;
        }

        // Which columns and rows are on screen (plus one extra on each side)
        const firstCol = Math.floor(-offsetX / CELL_WIDTH) - 1;
        const lastCol = Math.ceil((-offsetX + container.clientWidth) / CELL_WIDTH);
        const firstRow = Math.floor(-offsetY / CELL_HEIGHT) - 1;
        const lastRow = Math.ceil((-offsetY + container.clientHeight) / CELL_HEIGHT);

        const visibleKeys = new Set();

        for (let col = firstCol; col <= lastCol; col++) {
            for (let row = firstRow; row <= lastRow; row++) {
                const key = `${col},${row}`;
                visibleKeys.add(key);

                if (activeTiles.has(key)) continue;

                const index = photoIndexAt(col, row);
                const tile = fillPhotoCard(takeTile(), photos[index], index);
                tile.style.transform = `translate3d(${col * CELL_WIDTH}px, ${row * CELL_HEIGHT}px, 0)`;
                activeTiles.set(key, tile);
            }
        }

        activeTiles.forEach((tile, key) => {
            if (!visibleKeys.has(key)) {
                releaseTile(key, tile);
            }
        });

        plane.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    }

    // Batches any number of changes into one render per frame
    function requestRender() {
        if (renderFrame === null) {
            renderFrame = requestAnimationFrame(render);
        }
    }

    function panBy(dx, dy) {
        offsetX += dx;
        offsetY += dy;
        requestRender();
    }


    // --- MOMENTUM ---

    function glide() {
        if (Math.abs(velocityX) < MIN_VELOCITY && Math.abs(velocityY) < MIN_VELOCITY) {
            glideFrame = null;
            return;
        }

        panBy(velocityX, velocityY);
        velocityX *= FRICTION;
        velocityY *= FRICTION;
        glideFrame = requestAnimationFrame(glide);
    }

    function stopGlide() {
        cancelAnimationFrame(glideFrame);
        glideFrame = null;
        velocityX = 0;
        velocityY = 0;
    }


    // --- HINT ---

    function hideHint() {
        hint?.classList.add('is-hidden');
    }

    setTimeout(hideHint, HINT_TIMEOUT);


    // --- POINTER (mouse, touch and pen share this code) ---

    container.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) return;

        stopGlide();
        pointer = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            time: performance.now(),
            isDragging: false,
        };
    });

    container.addEventListener('pointermove', (event) => {
        if (!pointer || event.pointerId !== pointer.id) return;

        const dx = event.clientX - pointer.x;
        const dy = event.clientY - pointer.y;

        // A small wobble during a click shouldn't start a drag
        if (!pointer.isDragging) {
            if (Math.abs(dx) + Math.abs(dy) < DRAG_THRESHOLD) return;

            pointer.isDragging = true;
            container.setPointerCapture(event.pointerId);
            container.classList.add('is-dragging');
            hideHint();
        }

        const now = performance.now();
        const elapsed = Math.max(now - pointer.time, 1);

        // Velocity in px per ~16ms frame, used for the glide on release
        velocityX = (dx / elapsed) * 16;
        velocityY = (dy / elapsed) * 16;

        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.time = now;

        panBy(dx, dy);
    });

    function endPointer(event) {
        if (!pointer || event.pointerId !== pointer.id) return;

        if (pointer.isDragging) {
            container.classList.remove('is-dragging');

            // Swallow the click that follows a drag, so it doesn't open a photo
            justDragged = true;
            setTimeout(() => { justDragged = false; }, 0);

            // Only glide if the pointer was still moving when released
            const heldStill = performance.now() - pointer.time > 100;
            if (!reduceMotion && !heldStill) {
                glide();
            }
        }

        pointer = null;
    }

    container.addEventListener('pointerup', endPointer);
    container.addEventListener('pointercancel', endPointer);

    container.addEventListener('click', (event) => {
        if (justDragged) return;

        const tile = event.target.closest('.canvas-tile');
        if (tile) {
            onSelect(Number(tile.dataset.index));
        }
    });


    // --- WHEEL / TRACKPAD ---

    container.addEventListener('wheel', (event) => {
        event.preventDefault();
        stopGlide();
        hideHint();
        panBy(-event.deltaX, -event.deltaY);
    }, { passive: false });


    // --- KEYBOARD ---

    const KEY_DIRECTIONS = {
        ArrowLeft: [1, 0],
        ArrowRight: [-1, 0],
        ArrowUp: [0, 1],
        ArrowDown: [0, -1],
    };

    window.addEventListener('keydown', (event) => {
        const direction = KEY_DIRECTIONS[event.key];

        // Ignore when the canvas is hidden or the lightbox is using the arrows
        if (!direction || container.hidden || document.querySelector('dialog[open]')) return;

        event.preventDefault();
        const step = event.shiftKey ? KEY_STEP * 3 : KEY_STEP;
        panBy(direction[0] * step, direction[1] * step);
    });


    // --- RESIZE ---

    // Also fires when the canvas is shown again after the grid view
    new ResizeObserver(requestRender).observe(container);


    // --- PUBLIC ---

    // Swaps in a new list of photos, e.g. after the filters change.
    // Every tile is cleared so none keep showing a photo that was filtered out.
    function setPhotos(newPhotos) {
        photos = newPhotos;
        stopGlide();
        activeTiles.forEach((tile, key) => releaseTile(key, tile));
        requestRender();
    }

    render();

    return { setPhotos };
}
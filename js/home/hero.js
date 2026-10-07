
// Function to initialiSe the hero scroll behavior
// The profile card scrolls in as the user scrolls down the page
function initHeroScroll() {

    const main = document.querySelector('.hero-main');
    if (!main) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 57;

    let locked = false;

    // Where the profile screen sits when it's snapped into place
    const profileTop = () => Math.round(main.getBoundingClientRect().top + window.scrollY - navH);

    function snapTo(y) {
        locked = true;
        window.scrollTo({ top: y, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        setTimeout(() => (locked = false), 650);
    }

    // Returns 'down', 'up' or null depending on whether this action should snap
    function direction(delta) {
        const y = window.scrollY;
        const top = profileTop();
        if (delta > 0 && y < top - 2) return 'down';
        if (delta < 0 && y > 2 && y <= top + 10) return 'up';
        return null;
    }

    // Mouse wheel / trackpad
    window.addEventListener('wheel', (e) => {
        if (e.ctrlKey) return; // pinch-zoom
        const dir = direction(e.deltaY);
        if (!dir) return;
        e.preventDefault();
        if (!locked) snapTo(dir === 'down' ? profileTop() : 0);
    }, { passive: false });

    // Touch swipes
    let startY = 0;
    window.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        const delta = startY - e.touches[0].clientY; // positive = swiping up = scrolling down
        if (Math.abs(delta) < 20) return;
        const dir = direction(delta);
        if (!dir) return;
        e.preventDefault();
        if (!locked) snapTo(dir === 'down' ? profileTop() : 0);
    }, { passive: false });

    // Keyboard
    window.addEventListener('keydown', (e) => {
        const down = ['ArrowDown', 'PageDown', ' '].includes(e.key);
        const up = ['ArrowUp', 'PageUp'].includes(e.key);
        if (!down && !up) return;
        if (/input|select|textarea|button/i.test(document.activeElement.tagName)) return;
        const dir = direction(down ? 1 : -1);
        if (!dir) return;
        e.preventDefault();
        if (!locked) snapTo(dir === 'down' ? profileTop() : 0);
    });

}

initHeroScroll();

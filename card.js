// Tap / click anywhere on the profile card to flip it (Enter and Space work too).
(function () {
    const card = document.querySelector('.profile-card');
    if (!card) return;

    function toggle() {
        const flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', flipped);
    }

    card.addEventListener('click', toggle);

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });
})();
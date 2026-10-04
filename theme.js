// Toggles light/dark with a fade
(function () {
    const root = document.documentElement;
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function sync() {
        const light = root.dataset.theme === 'light';
        btn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    }

    btn.addEventListener('click', () => {
        const light = root.dataset.theme === 'light';

        const apply = () => {
            if (light) {
                delete root.dataset.theme;
            } else {
                root.dataset.theme = 'light';
            }
            try { localStorage.setItem('theme', light ? 'dark' : 'light'); } catch (e) {}
            sync();
        };

        // No support or reduced motion: just switch
        if (!document.startViewTransition || reduceMotion.matches) {
            apply();
            return;
        }

        // Circle grows from the centre of the button to the farthest corner
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(apply);

        // Circle transition
        transition.ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                {
                    duration: 600,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        });
    });

    sync();
})();
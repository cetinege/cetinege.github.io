/*
    RICH TEXT + MEDIA HELPERS for the project pages.

    TEXT (works in every text field in project-data.js)
    ---------------------------------------------------
    - Blank line            -> new paragraph
    - Single line break     -> <br> (stays on the same paragraph)
    - Lines starting "- "   -> bullet list
    - **bold**              -> bold
    - ==highlight==         -> highlighted
    - [text](https://...)   -> link (opens in a new tab)
    - Any HTML also works:  <mark>, <strong>, <em>, <a href>, <ul>, <code>...

    MEDIA (used by the "media" and "aside" arrays)
    ----------------------------------------------
    { type: "image",    src: "images/a.jpg", alt: "...", caption: "optional" }
    { type: "youtube",  id: "VIDEO_ID", caption: "optional" }
    { type: "linkedin", src: "https://www.linkedin.com/embed/feed/update/urn:li:...", height: 600, caption: "optional" }
*/
(function () {

    /* Inline shorthand. Runs on plain text and on text that already contains HTML. */
    function inline(str) {
        return str
            .replace(
                /\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|#[^)\s]*)\)/g,
                '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
            )
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/==(.+?)==/g, '<mark>$1</mark>');
    }

    function richText(value) {
        if (Array.isArray(value)) value = value.join(', ');
        const str = String(value ?? '').trim();
        if (!str) return '';

        // Already contains block-level HTML: use it as written
        if (/<(p|ul|ol|div|h\d|blockquote)[\s>]/i.test(str)) return inline(str);

        return str
            .split(/\n\s*\n/)
            .map(block => {
                const lines = block.split('\n').map(l => l.trim()).filter(Boolean);

                if (lines.length && lines.every(l => /^[-•]\s+/.test(l))) {
                    const items = lines.map(l => '<li>' + inline(l.replace(/^[-•]\s+/, '')) + '</li>');
                    return '<ul>' + items.join('') + '</ul>';
                }
                return '<p>' + inline(lines.join('<br>')) + '</p>';
            })
            .join('');
    }

    function setRich(el, value) {
        if (el) el.innerHTML = richText(value);
    }

    function mediaItem(item) {
        const fig = document.createElement('figure');
        fig.className = 'media-item media-' + item.type;

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt || '';
            img.loading = 'lazy';
            fig.appendChild(img);

        } else if (item.type === 'youtube') {
            const box = document.createElement('div');
            box.className = 'media-embed';
            const frame = document.createElement('iframe');
            frame.src = 'https://www.youtube-nocookie.com/embed/' + item.id;
            frame.title = item.alt || 'YouTube video';
            frame.loading = 'lazy';
            frame.allow = 'accelerometer; encrypted-media; picture-in-picture';
            frame.allowFullscreen = true;
            box.appendChild(frame);
            fig.appendChild(box);

        } else if (item.type === 'linkedin') {
            const frame = document.createElement('iframe');
            frame.src = item.src;
            frame.title = item.alt || 'LinkedIn post';
            frame.height = item.height || 600;
            frame.loading = 'lazy';
            frame.setAttribute('frameborder', '0');
            frame.allowFullscreen = true;
            fig.appendChild(frame);
        }

        if (item.caption) {
            const cap = document.createElement('figcaption');
            cap.innerHTML = inline(item.caption);
            fig.appendChild(cap);
        }
        return fig;
    }

    /* Fills a container, returns true if anything was rendered */
    function renderMedia(container, items) {
        if (!container) return false;
        container.textContent = '';
        (items || []).forEach(item => container.appendChild(mediaItem(item)));
        return container.children.length > 0;
    }

    window.richText = richText;
    window.setRich = setRich;
    window.renderMedia = renderMedia;
})();
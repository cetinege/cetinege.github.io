/*
    PHOTO LIBRARY

    The only file to edit when adding or removing photos. Both
    personal.html and gallery.html read from this list.

    Each photo needs two image files named after its id:
        assets/photos/thumbs/<id>.jpg   ~600px wide, used in grids and the canvas
        assets/photos/full/<id>.jpg     large, only loaded in the lightbox

    Fields:
        id           file name without the extension
        title        shown in the caption
        alt          describes the image for screen readers (falls back to title)
        date         shown under the title
        gear         'digital' | 'film' | 'phone'
        subject      'people' | 'animals' | 'landscape' | 'street'
        collections  any of 'favourites', 'travel', 'nights'
        tone         'colour' | 'bw'

    The filter values must match an option in PHOTO_FILTERS at the
    bottom of this file. To add a new value, add the option there too.
*/

const PHOTOS = [
    {
        id: '01',
        title: 'First light over the Peaks',
        alt: 'First light over the Peak District',
        date: 'MAR 2026',
        gear: 'digital',
        subject: 'landscape',
        collections: ['favourites', 'travel'],
        tone: 'colour',
    },
    {
        id: '02',
        title: 'Last train, Nottingham',
        date: 'FEB 2026',
        gear: 'film',
        subject: 'people',
        collections: ['nights'],
        tone: 'bw',
    },
    {
        id: '03',
        title: "Someone's dog, Wollaton Park",
        alt: 'A dog in Wollaton Park',
        date: 'JAN 2026',
        gear: 'digital',
        subject: 'animals',
        collections: ['favourites'],
        tone: 'colour',
    },
    {
        id: '04',
        title: 'Balconies, Kadıköy',
        alt: 'Balconies in Kadıköy',
        date: 'AUG 2025',
        gear: 'phone',
        subject: 'street',
        collections: ['travel'],
        tone: 'colour',
    },
    {
        id: '05',
        title: 'Ferry to the islands',
        alt: "Ferry crossing to the Princes' Islands",
        date: 'AUG 2025',
        gear: 'film',
        subject: 'landscape',
        collections: ['travel', 'favourites'],
        tone: 'colour',
    },
    {
        id: '06',
        title: 'Kitchen, 3am',
        alt: 'Friends in a kitchen at 3am',
        date: 'NOV 2025',
        gear: 'digital',
        subject: 'people',
        collections: ['nights'],
        tone: 'colour',
    },
    {
        id: '07',
        title: 'Cat that owns the corner shop',
        alt: 'A cat outside a corner shop',
        date: 'SEP 2025',
        gear: 'phone',
        subject: 'animals',
        collections: ['nights'],
        tone: 'colour',
    },
    {
        id: '08',
        title: 'Market Square in the rain',
        date: 'OCT 2025',
        gear: 'film',
        subject: 'street',
        collections: ['favourites'],
        tone: 'bw',
    },
    {
        id: '09',
        title: 'Cliffs, north coast',
        alt: 'Cliffs on the north coast',
        date: 'JUL 2025',
        gear: 'digital',
        subject: 'landscape',
        collections: ['travel'],
        tone: 'bw',
    },
    {
        id: '10',
        title: 'Waiting for the bus',
        alt: 'People waiting for a bus',
        date: 'JUN 2025',
        gear: 'phone',
        subject: 'people',
        collections: ['travel'],
        tone: 'colour',
    },
    {
        id: '11',
        title: 'Neon on Bridlesmith Gate',
        alt: 'Neon signage on Bridlesmith Gate',
        date: 'MAY 2025',
        gear: 'digital',
        subject: 'street',
        collections: ['nights', 'favourites'],
        tone: 'colour',
    },
    {
        id: '12',
        title: 'Gulls, early',
        alt: 'Gulls early in the morning',
        date: 'APR 2025',
        gear: 'film',
        subject: 'animals',
        collections: ['travel'],
        tone: 'bw',
    },
];


/*
    FILTERS

    The dropdowns shown on personal.html and gallery.html, built by
    photo-filters.js. Both pages read from here, so they always match.

        field    the photo field this filter checks (see the list above)
        label    shown above the dropdown
        options  value -> text shown in the dropdown, in display order.
                 'all' must come first; it means "don't filter on this".
*/

const PHOTO_FILTERS = [
    {
        field: 'gear',
        label: 'SHOT ON',
        options: {
            all: 'Any camera',
            digital: 'Digital camera',
            film: 'Film camera',
            phone: 'Phone',
        },
    },
    {
        field: 'subject',
        label: 'SUBJECT',
        options: {
            all: 'All subjects',
            people: 'People',
            animals: 'Animals',
            landscape: 'Landscape',
            street: 'Street & architecture',
        },
    },
    {
        field: 'collections',
        label: 'COLLECTION',
        options: {
            all: 'Everything',
            favourites: 'Personal favourites',
            // colour: 'colour;
            // autumn: 'Autumn'
            // travel: 'Travel',
            // nights: 'Nights out',
        },
    },
    {
        field: 'tone',
        label: 'TREATMENT',
        options: {
            all: 'Colour & B/W',
            colour: 'Colour',
            bw: 'Black & white',
        },
    },
];
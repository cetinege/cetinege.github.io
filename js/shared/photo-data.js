/*
    PHOTO LIBRARY

    The only file to edit when adding or removing photos.
    Both personal.html and gallery.html read from this list.

    Fields:
        id           file name without the extension
        folder       folder inside assets/gallery-pictures
        title        shown in the caption
        alt          describes the photo for screen readers
        date         shown under the title
        gear         "digital", "film" or "phone"
        subject      "people", "animals", "landscape" or "street"
        collections  a list, e.g. ["creatures"]
        tone         "colour" or "bw"

    Filter values (gear, subject, collections, tone) must match an
    option in PHOTO_FILTERS at the bottom of this file.
*/

const PHOTOS = [
    {
        id: "1000354402",
        folder: "black-and-white",
        title: "Nottingham Docks I",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354403",
        folder: "black-and-white",
        title: "Nottingham Docks II",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354404",
        folder: "black-and-white",
        title: "Nottingham Docks III",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354389",
        folder: "black-and-white",
        title: "Nottingham Docks IV",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354392",
        folder: "black-and-white",
        title: "Nottingham Docks V",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354395",
        folder: "black-and-white",
        title: "Nottingham Docks VI",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354449",
        folder: "black-and-white",
        title: "Nottingham Docks VII",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354448",
        folder: "black-and-white",
        title: "Nottingham Docks VIII",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354396",
        folder: "black-and-white",
        title: "Nottingham Docks IX",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354408",
        folder: "black-and-white",
        title: "Nottingham Docks X",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354397",
        folder: "black-and-white",
        title: "Nottingham Docks XI",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354398",
        folder: "black-and-white",
        title: "Nottingham Docks XII",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
    {
        id: "1000354450",
        folder: "black-and-white",
        title: "Nottingham Docks XIII",
        alt: "Beautiful creature(s).",
        date: "NOV 2026",
        subject: "animals",
        collections: ["creatures"],
        tone: "bw",
    },
];


/*
    FILTERS

    The dropdowns on personal.html and gallery.html.

        field    the photo field the dropdown checks
        label    shown above the dropdown
        options  value: text shown in the dropdown. "all" goes first.
*/

const PHOTO_FILTERS = [
    {
        field: "gear",
        label: "SHOT ON",
        options: {
            all: "Any camera",
            digital: "Digital camera",
            film: "Film camera",
            phone: "Phone",
        },
    },
    {
        field: "subject",
        label: "SUBJECT",
        options: {
            all: "All subjects",
            people: "People",
            animals: "Animals",
            landscape: "Landscape",
            street: "Street & architecture",
        },
    },
    {
        field: "collections",
        label: "COLLECTION",
        options: {
            all: "Everything",
            creatures: "Creatures",
        },
    },
    {
        field: "tone",
        label: "TREATMENT",
        options: {
            all: "Colour & B/W",
            colour: "Colour",
            bw: "Black & white",
        },
    },
];

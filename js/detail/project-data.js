/*
    PROJECT DETAIL PAGES

    One HTML file (detail.html) serves every project. Which one it
    shows depends on the URL:

        detail.html?project=nhs-dataviz

    To add a project: add an entry to the projects object below and
    link to it with its key. No new HTML file needed.

    Every field is optional except title.

    TEXT FIELDS (description, overview, role, technologies)
        Use backticks ` ` to write over several lines. Formatting:
          blank line       new paragraph
          single new line  line break
          - item           bullet list (every line in the block starts with "- ")
          **bold**         bold
          ==highlight==    highlighted words
          [text](https://example.com)   link
          Plain HTML (<mark>, <em>, <a>...) also works.

    media: [ ... ]   Full-width items under the divider (images, YouTube, LinkedIn).
    aside: [ ... ]   Optional right-hand column next to the text. If it is
                     longer than the text it scrolls inside its own box.
                     Leave it out and the column disappears.

        { type: "image",    src: "images/x.jpg", alt: "...", caption: "optional" }
        { type: "youtube",  id: "VIDEO_ID" }
        { type: "linkedin", src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:...", height: 600 }
*/

const projects = {

    "nhs-dataviz": {
        type: "UNIVERSITY PROJECT",
        title: "Visualisation of Health Data",
        description: "An interactive visualisation of NHS hospital admissions data, built with React and D3.js.",
        tags: ["React", "D3.js", "JavaScript"],

        overview: `
NHS Hospital Admitted Patient Care Activity (HAPCA) data is an annual report in England that measures hospital care for patients who are formally admitted to a hospital for treatment.

The problem is that it is published as a **==wall of spreadsheets==** with formatting inconsistencies across the decades. This project takes that **25+ data spanning 200M+ records** and allows interactive exploration for specialists and non-specialists, with **eight charts** and a visualisation recommendation system that suggests a suitable chart for the question being asked.
`,

        role: `
I acted as the team lead/admin for a group of eight, coordinating the team, distributing tasks and leading meetings while also building the animated **[bubble chart](https://www.youtube.com/watch?v=0n9N2xXK7NQ&t=186s)** and prototyping key design components in Figma before we committed to code.
I also built **[Higher or Lower: NHS HAPCA Edition](https://cetinege.github.io/detail.html?project=higher-or-lower)**, an interactive guessing game, to give visitors an engaging introduction to the hospital admissions dataset at the project's public demo day.
`,

        technologies: "**React** for the interface, **D3.js** for the visualisations, and **Figma** for prototyping.",

        // Full-width items under the divider, e.g.:
        // media: [
        //     { type: "image", src: "images/hapca-1.jpg", alt: "Dashboard overview", caption: "The main dashboard" },
        //     { type: "youtube", id: "VIDEO_ID" }
        // ],


        media: [
            { type: "youtube", id: "-iPyuSVeKGY", start: 6 }
        ],

        // Side column (scrolls if it is taller than the text)
        aside: [
            {
                type: "linkedin",
                src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7462207449954144256",
                height: 1593
            }
        ]
    },

    "higher-or-lower": {
        type: "UNIVERSTY PROJECT | WEB GAME",
        title: "HAPCA Higher or Lower",
        description: "A React-based game where users compare NHS hospital admissions data through a higher-or-lower format.",
        tags: ["React", "Supabase", "JavaScript"],

        media: [
            { type: "image", src: "assets/images/hapca.png", alt: "Home page for the Higher or Lower game", caption: "Home page for the Higher or Lower game" }
        ],


        live: "https://higherorlowerhapca.netlify.app",
        github: "https://github.com/cetinege/hapca-higher-or-lower",

        overview: `
        A **web game** built to visitors a fun and interactive way to explore NHS hospital admissions data. Two medical conditions appear side by side and you guess which had more people admitted (to the hospital), with the real figure revealed each round.
        
        I built this as part of a project(**[Visualisation of Health Data](https://cetinege.github.io/detail.html?project=nhs-dataviz)**) awarded 4th place in University of Nottingham's Second Year Group Project Contest. It helped make the demonstration day more engaging and interactive, and also provided a unique way to visualise health data.
        `,
        role: "A solo build. I designed the game mechanics, implemented the front-end interface, and integrated it with a backend database to store scores and manage the leaderboard.",
        technologies: "**React** for the game loop and **Supabase** for storing scores and the leaderboard."
    },

    "watching-you": {
        type: "TOOL",
        title: "Watching You",
        description: "A full-stack movie watchlist app with search, favouriting, custom lists and shareable public links.",
        tags: ["React", "Supabase", "JavaScript"],

        media: [
            { type: "image", src: "assets/images/watchlist-page-screen.png", alt: "Watching You app screenshot", caption: "Watchlist page for the Watching You app" }
        ],

        live: "https://watching-you-watchlist.netlify.app",
        github: "https://github.com/cetinege/watching-you",

        overview: "I wanted one place to keep what I meant to watch, and to be able to send a watchlist to a friend without either of us installing anything. It is open source, documented, and deployed for real use among friends. ",
        role: "Solo build and ongoing maintenance, including the contribution guidelines for other developers.",
        technologies: "**React** on the front end, **Supabase** for authentication and **PostgreSQL** storage, and the **TMDB API** for film metadata and artwork. Public lists are read-only views keyed by a share token."
    },

    "pain-detector": {
        type: "AI/ML PROJECT",
        title: "Facial Pain Detector",
        description: "A machine learning project exploring facial expressions and their relationship to perceived pain.",
        tags: ["Python", "MediaPipe", "OpenCV", "Matplotlib", "NumPy"],

        media: [
            { type: "image", src: "assets/images/pain-rec.png", alt: "Facial Pain Detector screenshot", caption: "Facial Pain Detector screenshot" }
        ],

        github: "https://github.com/cetinege/face-the-pain",

        overview: ` A small proof-of-concept / demo that estimates a heuristic "pain score" from a face, live from a webcam or from a video file, using MediaPipe's face landmark and blendshape detection. 
        
        I put myself through the pain (not really, there's a ton of good tutorials) of building this project in order to get some hands-on experience with the fundementals of sequence-level pain estimation from face videos. I learned about:
        - **Facial landmark extractions**,
        - **Action Units**,
        - **PSPI**,
        - And a lot more...

        It's intentionally simple and doesn't use a trained model to estimate pain. However I do plan on building on this project and trying out more complex implementations. Namely, I want to get my hands on **py-feat** and **OpenFace**. I will also be expanding this into a full dissertation project for my final year at university, so stay tuned for more updates!
        `,
        role: "Solo build, including the calibration and smoothing work that made the output usable.",
        technologies: "**Python** with **MediaPipe** for landmark and blendshape detection, **OpenCV** for video input, and **Matplotlib** for the trajectory and intensity-over-time plots I used to tune the weights."
    },

    "diagram-editor": {
        type: "TOOL",
        title: "PlantUML Drag & Edit",
        description: "A local web app for editing PlantUML class diagrams with draggable layout. Write PlantUML code, render it through a real PlantUML engine, then drag classes and packages around by hand.",
        tags: ["JavaScript", "Node.js", "PlantUML"],

        media: [
            { type: "image", src: "assets/images/plantuml-drag-demo.gif", alt: "PlantUML Drag & Edit Demo", caption: "PlantUML Drag & Edit Demo" }
        ],

        github: "https://github.com/cetinege/plantuml-drag-and-edit",
        // No "live" key, so no Live app button appears on this page

        overview: `I love using **PlantUML** to create my **class diagrams**. Not for fun, but for my university courseworks & projects. I'm not a psychopath. However, as good as PlantUML is, I still find myself spending a boatload of time trying to get the layout to look just perfect. Let me tell you, it's not a fun process. So I made this tool to be able to easily move around classes/packages and make everything look just how I want them to look.

It doesn't replace PlantUML's rendering or syntax because that part works great already. It takes PlantUML's own SVG output and adds interactive dragging on top of it.
        `,
        role: `Solo build, including diagram parsing, SVG manipulation, and the drag-and-drop interface.`,
        technologies: `**JavaScript** for the front end, **Node.js** for the back end, and **PlantUML** for rendering the diagrams. The app runs locally in a browser and communicates with a local PlantUML server to generate the SVGs.`
    },

    "spotify-songadder": {
        type: "TOOL",
        title: "Spotify SongAdder",
        description: "A web app that lets you add songs to a Spotify playlist by typing or pasting their names, without having to search for each one.",
        tags: ["JavaScript", "Spotify API"],
        github: "https://github.com/cetinege/song-adder",

        media: [
            { type: "image", src: "assets/images/spotify-songadder.png", alt: "Spotify SongAdder screenshot", caption: "Spotify SongAdder screenshot" }
        ],

        overview: ` Spotify SongAdder allows users to authenticate with Spotify and add songs to their playlists with ease. ==The app allows you to process playlists by entering the playlist link, adding tracks, and viewing feedback on added, skipped, or missing tracks==.

The reason I started this project was because I was watching the man, the myth, the legend **Sebastian Lague**, and I found myself really enjoying the background music in his videos. I was always into **editing**, so I liked saving songs to use in the background and his video descriptions usually included a list of the songs he used. Since his videos were usually quite long, that meant there were a lot of songs and of course he would use some of the same songs in his other videos. That's why I decided to automate this process of copying a song title from his description and adding it to my Spotify playlist one by one. I did NOT want to spend hours torturing myself by doing all of that manual task, so instead, I tortured myself for hours making this app instead.

I was done in about a day or two, and ==I was fairly happy with the project because it solved a problem I had==. But it actually turned out to solve one of my friend's problem too. He was getting song recommendations from everyone and he created this Spotify playlist where he would add one song (which later became 5) a day for a year. However, he wanted there to be no repeat of artists. So that's why my program currently has a "allow for repeated artists" button. Fun story I suppose.

This is also the project that made me learn the value of **environmental variables**. I'd like to think every developer at some point accidently pushed their API key to GitHub so to avoid that I created environmental variables and stored my secrets there.

        `,
        role: "Solo build, including the front-end interface and integration with the Spotify API.",
        technologies: "**JavaScript** for the front end, and the **Spotify Web API** for searching and adding tracks to playlists."
    },

    "photo-mosaic": {
        type: "TOOL",
        title: "Photo-Mosaic",
        description: "A Python-based image processing tool that uses the Python Imaging Library (PIL/Pillow) to create a photomosaic based on a dictionary of source images.",
        tags: ["Python", "PIL/Pillow", "Image Processing"],
        github: "https://github.com/cetinege/photo-mosaic",

        media: [
            { type: "image", src: "assets/images/photo-mosaic.jpg", alt: "Photo-Mosaic screenshot", caption: "Photo-Mosaic screenshot" }
        ],


        overview: `A **photomosaic (or photographic mosaic)** is a large image composed of hundreds or thousands of smaller photographs (tiles). 

        This is a simple image processing tool that uses the Python Imaging Library (PIL/Pillow) to create a photomosaic based on a dictionary of source images. I made it to understand how image processing works and to learn more about Python. It ==takes a target image and a set of source images, and replaces each tile in the target image with the source image that best matches the average color of that tile==. The result is a mosaic that resembles the original image when viewed from a distance.
        
        It also makes a fun gift when used with right images.
        `,
        role: "Solo build, including image processing logic and the user interface.",
        technologies: "**Python** for the backend, **PIL/Pillow** for image manipulation, and a simple web interface for user interaction."
    },

    "desktop-pet": {
        type: "TOOL",
        title: "Desktop Pet",
        description: "A Python-based desktop application that creates a small animated pet on the user's desktop.",
        tags: ["Python"],
        github: "https://github.com/cetinege/desktopet",
        media: [
            { type: "image", src: "assets/images/desktop-pet.png", alt: "Desktop Pet screenshot", caption: "Desktop Pet screenshot" }
        ],
        overview: `A desktop pet is a small animated character that appears on your computer screen and keeps you company. I built this as a fun project to learn more about **Python and GUI development**.`,
        role: "Solo build, including the animation logic and the user interface.",
        technologies: "**Python** for the backend, and a simple GUI framework for user interaction."
    },

    "volunteer-dispatch-sim": {
        type: "HACKATHON",
        title: "Volunteer Dispatch Simulator",
        description: "A web game that simulates the dispatch of volunteers to various locations based on their skills and availability.",
        tags: ["TypeScript", "JavaScript"],
        github: "https://github.com/cetinege/volunteer-dispatch-sim",
        live: "https://govolunteer.netlify.app",

        media: [
            { type: "youtube", id: "fMq5_OGFLD0" }
        ],

        overview: `
We're volunteer members (Exchange Managers) of **AIESEC UK** in various local committees and we wanted to develop a game where we can show off what kind of things someone from our line of work would do. AIESEC's goal is to send interested volunteers all over the world and create cross-cultural exchange experiences that develop leadership in young people.

As an Exchange Manager, my role involves ==matching volunteers to international opportunities, supporting them through the preparation process, handling documentation, communicating with partner countries, and solving unexpected challenges along the way==. It’s **fast-paced**, **people-focused**, and **requires balancing multiple cases** at once.

We realised that many people don’t fully understand what happens behind the scenes of an exchange. So we decided to turn our day-to-day responsibilities into a simulation game by allowing players to experience the pressure, decision-making, and strategy involved in managing volunteers.

This project is not affiliated with or endorsed by AIESEC. It is independently created and inspired by our personal experiences as volunteers.
        `,
        role: "I led the development of the game, including the design of the simulation mechanics, the user interface, and the implementation of the game logic.",
        technologies: "**TypeScript** for the game logic, **JavaScript** for the front-end interface, and a simple web framework for rendering the game in the browser.",
    },

    "review-my-review": {
        type: "TOOL | AI/ML PROJECT",
        title: "Review-My-Review",
        description: "A sentiment analysis model that evaluates a block of text and classifies it as either positive or negative.",
        tags: ["**Python**", "**Machine Learning**", "**TensorFlow / Keras**", "**NumPy**, **Pandas**, **Matplotlib**, **Scikit-learn**"],
        github: "https://github.com/cetinege/review-my-review",

        media:[
            { type: "image", src: "assets/images/review-my-review.png", alt: "Review-My-Review screenshot", caption: "Review-My-Review screenshot" }
        ],

        overview: `This project builds a **deep learning model** that classifies movie reviews as positive or negative using **natural language processing** and an **LSTM neural network**.
        
        ==The IMDB dataset provides labeled reviews categorised as either positive or negative.== These labels are converted into numerical form for model training:
        - **Positive → 1**
        - **Negative → 0**
        
        The dataset is split into training and testing sets using an 80/20 ratio (which is generally accepted as a good split), with a fixed random seed (42) to ensure reproducibility.
        The text is prepared using **Keras’ Tokenizer**, which takes the reviews (text) and converts them into sequences of integers (word indexes). This way each review becomes a list of numbers. Fantastic. The problem, however, is that different reviews have different lengths (some are short, some very long ((like my reviews))). Neural networks need fixed-length input so I chose the maximum length to be 200 (tokens). 
        After training, the model is evaluated to measure its generalisation performance.
        `,
        role: "I designed and implemented the model architecture, performed data preprocessing, and conducted training and evaluation of the sentiment analysis model.",
        technologies: "**Python** for data preprocessing and model implementation, **TensorFlow/Keras** for building and training the neural network, and various libraries such as **NumPy**, **Pandas**, **Matplotlib**, and **Scikit-learn** for data manipulation and visualization."
    }
};


/* Reads ?project=... from the address bar */
const parameters = new URLSearchParams(window.location.search);
const projectKey = parameters.get("project");
const project = projects[projectKey];


/* Writes plain text into an element, if that element exists */
function setText(elementId, text) {
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = text || "";
    }
}


/* Writes formatted text (see the formatting list at the top) */
function setRichText(elementId, text) {
    setRich(document.getElementById(elementId), text);
}


/* Builds the tag pills */
function renderTags(tags) {
    const container = document.getElementById("project-tags");

    if (!container || !tags) {
        return;
    }

    tags.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        container.appendChild(span);
    });
}


/* Builds the Live app and GitHub buttons */
function renderLinks(project) {
    const container = document.getElementById("project-links");

    if (!container) {
        return;
    }

    if (project.live) {
        const liveLink = document.createElement("a");
        liveLink.className = "btn btn-primary";
        liveLink.href = project.live;
        liveLink.target = "_blank";
        liveLink.rel = "noopener noreferrer";
        liveLink.textContent = "Live app";
        container.appendChild(liveLink);
    }

    if (project.github) {
        const githubLink = document.createElement("a");
        githubLink.className = "btn btn-outline";
        githubLink.href = project.github;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        githubLink.textContent = "GitHub";
        container.appendChild(githubLink);
    }
}


/* Full-width media under the divider, and the optional side column */
function renderMediaSections(project) {
    const media = document.getElementById("project-media");
    const aside = document.getElementById("project-aside");
    const columns = document.getElementById("case-study-columns");

    if (media) {
        media.hidden = !renderMedia(media, project.media);
    }

    const hasAside = renderMedia(document.getElementById("project-aside-inner"), project.aside);

    if (aside) {
        aside.hidden = !hasAside;
    }

    if (columns) {
        columns.classList.toggle("has-aside", hasAside);
    }
}


/* Shown when the URL asks for a project that isn't in the object above */
function renderNotFound() {
    document.title = "Project not found | Ege Cetin";

    setText("breadcrumb-current", "Not found");
    setText("project-title", "Project not found");
    setRichText("project-description", "That project doesn't exist yet. Head back to the projects list to see what's there.");

    document.querySelector(".case-study").classList.add("case-study-missing");
    document.querySelector(".case-study-body").hidden = true;
}


if (project) {
    document.title = `${project.title} | Ege Cetin`;

    setText("breadcrumb-current", project.title);
    setText("project-type", project.type);
    setText("project-title", project.title);

    setRichText("project-description", project.description);
    setRichText("project-overview", project.overview);
    setRichText("project-role", project.role);
    setRichText("project-technologies", project.technologies);

    renderTags(project.tags);
    renderLinks(project);
    renderMediaSections(project);
} else {
    renderNotFound();
}
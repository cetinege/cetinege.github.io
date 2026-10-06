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

The problem is that it is published as a ==wall of spreadsheets== with formatting inconsistencies across the decades. This project turns it into something a non-specialist can explore, with **eight visualisations** and a chart recommendation system that suggests a suitable chart for the question being asked.
`,

        role: `
I acted as the team lead/admin for a group of eight, coordinating the team, distributing tasks and leading meetings while also building the animated bubble chart and prototyping key design components in Figma before we committed to code.
`,

        technologies: "React for the interface, D3.js for the visualisations, and Figma for prototyping.",

        // Full-width items under the divider, e.g.:
        // media: [
        //     { type: "image", src: "images/hapca-1.jpg", alt: "Dashboard overview", caption: "The main dashboard" },
        //     { type: "youtube", id: "VIDEO_ID" }
        // ],

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
        type: "WEB GAME",
        title: "HAPCA Higher or Lower",
        description: "A React-based game where users compare NHS hospital admissions data through a higher-or-lower format.",
        tags: ["React", "Supabase", "JavaScript"],

        live: "https://higherorlowerhapca.netlify.app",
        github: "https://github.com/cetinege/hapca-higher-or-lower",

        overview: "At the public demo day, most visitors were never going to read a dashboard cold. This game gives them a reason to care about the numbers first: two conditions appear side by side and you guess which had more admissions, with the real figure revealed each round.",
        role: "A solo build alongside the main group project, from the idea through to the deployed version used on the day.",
        technologies: "React for the game loop and Supabase for storing scores. The scoring weights toward closer pairs, because early versions were too easy and people stopped after two guesses."
    },

    "watching-you": {
        type: "PERSONAL PROJECT",
        title: "Watching You",
        description: "A full-stack movie watchlist app with search, favouriting, custom lists and shareable public links.",
        tags: ["React", "Supabase", "JavaScript"],

        live: "https://watching-you-watchlist.netlify.app",
        github: "https://github.com/cetinege/watching-you",

        overview: "I wanted one place to keep what I meant to watch, and to be able to send a list to a friend without either of us installing anything. It is open source, documented, and deployed for real use among friends.",
        role: "Solo build and ongoing maintenance, including the contribution guidelines for other developers.",
        technologies: "React on the front end, Supabase for authentication and PostgreSQL storage, and the TMDB API for film metadata and artwork. Public lists are read-only views keyed by a share token."
    },

    "pain-detector": {
        type: "TOOL",
        title: "Facial Pain Detector",
        description: "A machine learning project exploring facial expressions and their relationship to perceived pain.",
        tags: ["Python", "MediaPipe", "OpenCV", "Matplotlib", "NumPy"],

        github: "https://github.com/cetinege/face-the-pain",
        // No "live" key, so no Live app button appears on this page

        overview: "The tool reads face landmarks and blendshape scores frame by frame from a webcam or video file, and combines the ones associated with pain expression into a single intensity score. It is an exploration rather than a clinical instrument, and has not been validated against any established pain scale.",
        role: "Solo build, including the calibration and smoothing work that made the output usable.",
        technologies: "Python with MediaPipe for landmark and blendshape detection, OpenCV for video input, and Matplotlib for the trajectory and intensity-over-time plots I used to tune the weights."
    },

    "diagram-editor": {
        type: "TOOL",
        title: "PlantUML Drag & Edit",
        description: "A local web app for editing PlantUML class diagrams with draggable layout. Write PlantUML code, render it through a real PlantUML engine, then drag classes and packages around by hand.",
        tags: ["JavaScript", "Node.js", "PlantUML"],

        github: "https://github.com/cetinege/plantuml-drag-and-edit",
        // No "live" key, so no Live app button appears on this page

        overview: `I love using PlantUML to create my class diagrams. Not for fun, but for my university courseworks & projects. I'm not a psychopath. However, as good as PlantUML is, I still find myself spending a boatload of time trying to get the layout to look just perfect. Let me tell you, it's not a fun process. So I made this tool to be able to easily move around classes/packages and make everything look just how I want them to look.

It doesn't replace PlantUML's rendering or syntax because that part works great already. It takes PlantUML's own SVG output and adds interactive dragging on top of it.
        `,
        role: `Solo build, including diagram parsing, SVG manipulation, and the drag-and-drop interface.`,
        technologies: `JavaScript for the front end, Node.js for the back end, and PlantUML for rendering the diagrams. The app runs locally in a browser and communicates with a local PlantUML server to generate the SVGs.`
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
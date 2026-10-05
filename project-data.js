/*
    PROJECT DETAIL PAGES

    One HTML file (detail.html) serves every project. Which one it
    shows depends on the URL:

        detail.html?project=nhs-dataviz

    To add a project: add an entry to the projects object below and
    link to it with its key. No new HTML file needed.

    Every field is optional except title. Leave "live" out entirely for
    projects that aren't deployed and the Live app button won't appear.
*/

const projects = {

    "nhs-dataviz": {
        type: "UNIVERSITY PROJECT",
        title: "Visualisation of Health Data",
        description: "An interactive visualisation of NHS hospital admissions data, built with React and D3.js.",
        tags: ["React", "D3.js", "JavaScript"],

        // <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7462207449954144256" height="1593" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>

        overview: "NHS Hospital Admitted Patient Care Activity (HAPCA) data is an annual report in England that that measures hospital care for patients who are formally admitted to a hospital for treatment. The problem is that it is published as a wall of spreadsheets with formatting inconsistencies across the decades. This project turns it into something a non-specialist can explore, with eight visualisations and a chart recommendation system that suggests a suitable chart for the question being asked.",

        role: "I acted as the team lead/admin for a group of eight, coordinating the team, distributing tasks and leading meetings while also building the animated bubble chart and prototyping key design components in Figma before we committed to code.",
        technologies: "React for the interface, D3.js for the visualisations, and Figma for prototyping."
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
        type: "AI PROJECT",
        title: "Facial Pain Detector",
        description: "A machine learning project exploring facial expressions and their relationship to perceived pain.",
        tags: ["Python", "MediaPipe", "OpenCV"],

        github: "#",
        // No "live" key, so no Live app button appears on this page

        overview: "The tool reads face landmarks and blendshape scores frame by frame from a webcam or video file, and combines the ones associated with pain expression into a single intensity score. It is an exploration rather than a clinical instrument, and has not been validated against any established pain scale.",
        role: "Solo build, including the calibration and smoothing work that made the output usable.",
        technologies: "Python with MediaPipe for landmark and blendshape detection, OpenCV for video input, and Matplotlib for the trajectory and intensity-over-time plots I used to tune the weights."
    }

};


/* Reads ?project=... from the address bar */
const parameters = new URLSearchParams(window.location.search);
const projectKey = parameters.get("project");
const project = projects[projectKey];


/* Writes text into an element, if that element exists */
function setText(elementId, text) {
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = text || "";
    }
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


/* Shown when the URL asks for a project that isn't in the object above */
function renderNotFound() {
    document.title = "Project not found | Ege Cetin";

    setText("breadcrumb-current", "Not found");
    setText("project-title", "Project not found");
    setText("project-description", "That project doesn't exist yet. Head back to the projects list to see what's there.");

    document.querySelector(".case-study").classList.add("case-study-missing");
    document.querySelector(".case-study-content").hidden = true;
}


if (project) {
    document.title = `${project.title} | Ege Cetin`;

    setText("breadcrumb-current", project.title);
    setText("project-type", project.type);
    setText("project-title", project.title);
    setText("project-description", project.description);
    setText("project-overview", project.overview);
    setText("project-role", project.role);
    setText("project-technologies", project.technologies);

    renderTags(project.tags);
    renderLinks(project);
} else {
    renderNotFound();
}

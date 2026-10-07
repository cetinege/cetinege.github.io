/*
    LINKEDIN POST TOGGLES
*/

const postToggles = document.querySelectorAll(".post-toggle");

postToggles.forEach(button => {
    button.addEventListener("click", () => {
        const postId = button.getAttribute("aria-controls");
        const post = document.getElementById(postId);

        const isOpen = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", !isOpen);
        post.hidden = isOpen;

        button.textContent = isOpen ? "Show LinkedIn post" : "Hide LinkedIn post";
    });
});

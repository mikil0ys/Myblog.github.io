/* ------------------------------
   DARK MODE
------------------------------ */
const toggleDark = document.getElementById("toggleDark");

if (toggleDark) {
    toggleDark.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    });
}

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

/* ------------------------------
   BLOG CONTENT
------------------------------ */
const blogs = {
    1: {
        title: "How to Stay Productive",
        content: `<h2>How to Stay Productive</h2>
<p>Staying productive isn’t about doing more — it’s about doing what matters.</p>`
    },
    2: {
        title: "Exploring Nature",
        content: `<h2>Exploring Nature</h2>
<p>Nature heals, inspires, and reconnects us with life.</p>`
    },
    3: {
        title: "Tech Innovations 2025",
        content: `<h2>Tech Innovations 2025</h2>
<p>The future is here — and it's smarter than ever.</p>`
    }
};

/* ------------------------------
   LOAD BLOG PAGE
------------------------------ */
if (location.pathname.includes("blog.html")) {
    const id = new URLSearchParams(location.search).get("id");
    if (blogs[id]) {
        document.getElementById("blogTitle").innerHTML = blogs[id].title;
        document.getElementById("blogContent").innerHTML = blogs[id].content;
    }
}

/* ------------------------------
   COMMENTS SYSTEM
------------------------------ */
const blogID = new URLSearchParams(location.search).get("id") || "default";

function loadComments() {
    if (!document.getElementById("commentsList")) return;
    const comments = JSON.parse(localStorage.getItem("comments_" + blogID)) || [];
    document.getElementById("commentsList").innerHTML =
        comments.map(c => `<div class="comment">${c}</div>`).join("");
}

function postComment() {
    const text = document.getElementById("commentText").value;
    if (!text.trim()) return;
    let comments = JSON.parse(localStorage.getItem("comments_" + blogID)) || [];
    comments.push(text);
    localStorage.setItem("comments_" + blogID, JSON.stringify(comments));
    document.getElementById("commentText").value = "";
    loadComments();
}

if (location.pathname.includes("blog.html")) loadComments();

/* ------------------------------
   SEARCH FILTER
------------------------------ */
const search = document.getElementById("search");

if (search) {
    search.addEventListener("keyup", () => {
        const filter = search.value.toLowerCase();
        const cards = document.querySelectorAll(".blog-card");
        cards.forEach(card => {
            const title = card.querySelector(".blog-title").innerText.toLowerCase();
            card.style.display = title.includes(filter) ? "block" : "none";
        });
    });
}



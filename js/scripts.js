// public/js/scripts.js
document.addEventListener("DOMContentLoaded", () => {
    loadBlogPosts();
    loadBooks();
});

function loadBlogPosts() {
    fetch('/blog')
        .then(response => response.json())
        .then(data => {
            const blogPostsDiv = document.getElementById("blog-posts");
            data.forEach(post => {
                const postDiv = document.createElement("div");
                postDiv.className = "col-md-4";
                postDiv.innerHTML = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.content.substring(0, 100)}...</p>
                        </div>
                    </div>
                `;
                blogPostsDiv.appendChild(postDiv);
            });
        });
}

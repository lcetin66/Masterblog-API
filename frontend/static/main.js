// Global posts data to avoid complex escaping in HTML
let allPosts = [];
let currentEditingId = null;

window.onload = function() {
    console.log("Page loaded");
    var savedBaseUrl = localStorage.getItem('apiBaseUrl');
    if (savedBaseUrl) {
        document.getElementById('api-base-url').value = savedBaseUrl;
        loadPosts();
    }
}

function loadPosts() {
    var baseUrl = document.getElementById('api-base-url').value;
    console.log("Loading posts from:", baseUrl);
    localStorage.setItem('apiBaseUrl', baseUrl);

    fetch(baseUrl + '/posts')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            allPosts = data; // Save to global variable
            console.log("Posts received:", data);
            displayPosts(data);
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            alert("Could not load posts. Check if backend is running at: " + baseUrl);
        });
}

function displayPosts(data) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';

    const sortBy = document.getElementById('sort-by').value;
    const sortedData = sortData(data, sortBy);

    sortedData.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-header">
                <h2>${escapeHtml(post.title)}</h2>
                <span class="post-date">${post.date || ''}</span>
            </div>
            <p class="post-author">By: <strong>${escapeHtml(post.author || 'Anonymous')}</strong></p>
            <p class="post-content">${escapeHtml(post.content)}</p>
            <div class="actions">
                <button class="edit-btn" onclick="startEdit(${post.id})">Edit</button>
                <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
            </div>`;
        postContainer.appendChild(postDiv);
    });
}

// Security: Helper to escape HTML and prevent JS breaks
function escapeHtml(text) {
    if (!text) return "";
    return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function sortData(data, criteria) {
    const sorted = [...data];
    switch (criteria) {
        case 'id-desc': return sorted.sort((a, b) => b.id - a.id);
        case 'id-asc': return sorted.sort((a, b) => a.id - b.id);
        case 'title-asc': return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'title-desc': return sorted.sort((a, b) => b.title.localeCompare(a.title));
        default: return sorted;
    }
}

function addPost() {
    var baseUrl = document.getElementById('api-base-url').value;
    var title = document.getElementById('post-title').value;
    var author = document.getElementById('post-author').value;
    var content = document.getElementById('post-content').value;

    if (!title || !content) {
        alert("Title and Content are required!");
        return;
    }

    const method = currentEditingId ? 'PUT' : 'POST';
    const url = currentEditingId ? `${baseUrl}/posts/${currentEditingId}` : `${baseUrl}/posts`;

    console.log(`${method} request to:`, url);

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, content })
    })
    .then(response => response.json())
    .then(post => {
        console.log('Success:', post);
        cancelUpdate();
        loadPosts();
    })
    .catch(error => console.error('Error:', error));
}

function startEdit(id) {
    console.log("Starting edit for ID:", id);
    const post = allPosts.find(p => p.id === id);
    if (!post) return;

    currentEditingId = id;
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-author').value = post.author || '';
    document.getElementById('post-content').value = post.content;
    document.getElementById('add-update-btn').innerText = 'Update Post';
    document.getElementById('cancel-btn').style.display = 'inline';
    window.scrollTo(0, 0); // Scroll to top to see form
}

function cancelUpdate() {
    currentEditingId = null;
    document.getElementById('post-title').value = '';
    document.getElementById('post-author').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('add-update-btn').innerText = 'Add Post';
    document.getElementById('cancel-btn').style.display = 'none';
}

function searchPosts() {
    var baseUrl = document.getElementById('api-base-url').value;
    var query = document.getElementById('search-query').value;

    if (!query) {
        loadPosts();
        return;
    }

    fetch(`${baseUrl}/posts/search?title=${query}&content=${query}`)
        .then(response => response.json())
        .then(data => displayPosts(data))
        .catch(error => console.error('Search Error:', error));
}

function deletePost(postId) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    var baseUrl = document.getElementById('api-base-url').value;
    fetch(baseUrl + '/posts/' + postId, { method: 'DELETE' })
    .then(() => {
        console.log('Deleted:', postId);
        loadPosts();
    })
    .catch(error => console.error('Delete Error:', error));
}

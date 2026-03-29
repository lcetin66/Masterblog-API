from flask import Flask, jsonify, request
from flask_cors import CORS  # type: ignore[import-untyped]

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

POSTS = [
    {"id": 1, "title": "First post", "content": "This is the first post."},
    {"id": 2, "title": "Second post", "content": "This is the second post."},
]

def generate_next_id():
    """
    Returns the next available ID for a new post.
    """
    if not POSTS:
        return 1

    max_id = 0
    for post in POSTS:
        if post["id"] > max_id:
            max_id = post["id"]

    return max_id + 1

@app.route('/api/posts', methods=['GET'])
def get_posts():
    """
    Returns all posts.
    """
    return jsonify(POSTS)

@app.route('/api/posts', methods=['POST'])
def add_post():
    """
    Adds a new post to the list.
    """
    data = request.get_json()

    if data is None:
        return jsonify({"error": "Invalid JSON body"}), 400

    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({"error": "Both 'title' and 'content' are required!"}), 400

    new_post = {
        "id": generate_next_id(),
        "title": title,
        "content": content
    }

    POSTS.append(new_post)
    return jsonify(new_post), 201

@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    for post in POSTS:
        if post["id"] == post_id:
            POSTS.remove(post)
            return jsonify({"message": "Post deleted"}), 200
    return jsonify({"error": "Post not found"}), 404

@app.route('/api/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.get_json(silent=True)

    if not data or "title" not in data or "content" not in data:
        return jsonify({"error": "Both 'title' and 'content' are required"}), 400

    for post in POSTS:
        if post["id"] == post_id:
            post["title"] = data["title"]
            post["content"] = data["content"]
            return jsonify(post), 200

    return jsonify({"error": "Post not found"}), 404

@app.route('/api/posts/search', methods=['GET'])
def search_posts():
    title_q = request.args.get("title", "").lower()
    content_q = request.args.get("content", "").lower()

    results = []

    for post in POSTS:
        title_match = False
        content_match = False

        if title_q:
            if title_q in post["title"].lower():
                title_match = True

        if content_q:
            if content_q in post["content"].lower():
                content_match = True

        if title_match or content_match:
            results.append(post)

    return jsonify(results), 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002, debug=True)

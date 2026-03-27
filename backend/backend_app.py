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


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002, debug=True)

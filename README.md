# Masterblog API 🚀

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0%2B-lightgrey?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-green?logo=swagger&logoColor=white)](https://swagger.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive RESTful Blog API system built with Flask, featuring full CRUD operations, advanced search functionality, and integrated Swagger UI for seamless testing and documentation.

## 📁 Project Structure

```text
Masterblog-API/
├── backend/
│   ├── backend_app.py      # Core Flask API implementation
│   └── static/
│       └── masterblog.json # OpenAPI/Swagger specification
├── frontend/
│   ├── frontend_app.py     # Frontend server (rendering UI)
│   ├── static/             # Frontend assets (CSS, JS)
│   └── templates/          # HTML templates
├── requirements.txt        # Project dependencies
└── README.md               # Documentation
```

## ✨ Features

- **Full CRUD Support**: Create, Read, Update, and Delete blog posts.
- **Search Engine**: Filter posts by title or content via query parameters.
- **Auto-Documentation**: Integrated Swagger UI for real-time API exploration.
- **CORS Enabled**: Ready for cross-origin frontend integrations.
- **Persistent-like State**: In-memory data management with dynamic ID generation.

## 🛠️ Requirements

- Python 3.8+
- Flask
- Flask-CORS
- Flask-Swagger-UI

## 🚀 Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Masterblog-API
   ```

2. **Setup Virtual Environment (Recommended):**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Backend:**
   ```bash
   cd backend
   python3 backend_app.py
   ```
   *The server will start at `http://localhost:5002`*

5. **Run the Frontend (Optional):**
   ```bash
   cd ../frontend
   python3 frontend_app.py
   ```

## 📖 API Documentation

Once the backend is running, you can access the interactive Swagger UI at:
👉 **[http://localhost:5002/api/docs/](http://localhost:5002/api/docs/)**

### Main Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/posts` | Retrieve all posts |
| `POST` | `/api/posts` | Create a new post |
| `PUT` | `/api/posts/{id}` | Update an existing post |
| `DELETE` | `/api/posts/{id}` | Delete a post |
| `GET` | `/api/posts/search` | Search posts |

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

# Google Books API POC

A simple Node.js application that demonstrates the usage of the Google Books API using Express.

## Features

- RESTful API endpoint for searching books
- Express server implementation
- Error handling and input validation
- JSON response format
- Simple HTML interface for testing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will start on port 3000 by default. You can change the port by setting the `PORT` environment variable.

## API Endpoints

### 1. Search Books
```
GET /api/search?q=your search query
```

Search for books using the Google Books API.

**Parameters:**
- `q` (required): Your search query (e.g., "harry potter", "the lord of the rings")

**Example Request:**
```bash
curl "http://localhost:3000/api/search?q=harry potter"
```

**Example Response:**
```json
[
  {
    "title": "Harry Potter and the Philosopher's Stone",
    "authors": ["J.K. Rowling"],
    "publishedDate": "1997-06-26",
    "description": "...",
    "pageCount": 320,
    "categories": ["Fiction", "Fantasy"],
    "imageLinks": {
      "thumbnail": "http://books.google.com/books/content?id=..."
    }
  }
]
```

**Error Responses:**
- 400 Bad Request: When no search query is provided
- 500 Internal Server Error: When the Google Books API request fails

### 2. Home Page
```
GET /
```

A simple HTML page with instructions and an example link.

## Testing the API

1. Open your browser and visit `http://localhost:3000`
2. Click the example link or use the search endpoint directly
3. Use curl or any API client to make requests:
```bash
curl "http://localhost:3000/api/search?q=harry potter"
```

## API Reference

This project uses the Google Books API. For more information, visit:
https://developers.google.com/books/docs/v1/using 
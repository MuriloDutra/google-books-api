require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

async function searchBooks(query) {
    try {
        const url = new URL(GOOGLE_BOOKS_API);
        url.searchParams.append('q', query);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data.items.map(book => ({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || ['Unknown Author'],
            publishedDate: book.volumeInfo.publishedDate || 'N/A',
            description: book.volumeInfo.description || 'No description available',
            pageCount: book.volumeInfo.pageCount || 'N/A',
            categories: book.volumeInfo.categories || ['Uncategorized'],
            imageLinks: book.volumeInfo.imageLinks || {}
        }));
    } catch (error) {
        console.error('Error searching books:', error.message);
        throw error;
    }
}

// Middleware to parse JSON bodies
app.use(express.json());

// Search endpoint
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q;
        
        if (!query) {
            return res.status(400).json({ 
                error: 'Please provide a search query using the "q" parameter' 
            });
        }

        const books = await searchBooks(query);
        res.json(books);
    } catch (error) {
        console.error('Search failed:', error.message);
        res.status(500).json({ 
            error: 'Failed to search books',
            message: error.message 
        });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.send(`
        <h1>Google Books API</h1>
        <p>Use the following endpoint to search for books:</p>
        <code>GET /api/search?q=your search query</code>
        <p>Example: <a href="/api/search?q=harry potter">/api/search?q=harry potter</a></p>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Try searching for books using: http://localhost:${port}/api/search?q=harry potter`);
}); 
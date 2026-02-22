const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create requests table
        db.run(`CREATE TABLE IF NOT EXISTS requests (
      id TEXT PRIMARY KEY,
      companyName TEXT,
      deptName TEXT,
      docNo TEXT,
      requesterPosition TEXT,
      requesterName TEXT,
      reviewerPosition TEXT,
      reviewerName TEXT,
      approverPosition TEXT,
      approverName TEXT,
      currentDate TEXT,
      metaDeptTeam TEXT,
      metaTo TEXT,
      reason TEXT,
      closing TEXT,
      status TEXT,
      createdAt TEXT,
      items JSON
    )`, (err) => {
            if (err) console.error('Error creating table', err.message);
        });
    }
});

// API Endpoints

// GET all requests
app.get('/api/requests', (req, res) => {
    db.all('SELECT * FROM requests ORDER BY createdAt DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Parse the JSON string back to an array
        const requests = rows.map(row => ({
            ...row,
            items: JSON.parse(row.items || '[]')
        }));
        res.json(requests);
    });
});

// POST new request
app.post('/api/requests', (req, res) => {
    const { id, items, ...rest } = req.body;
    const itemsJson = JSON.stringify(items || []);

    const columns = ['id', ...Object.keys(rest), 'items'];
    const values = [id, ...Object.values(rest), itemsJson];
    const placeholders = columns.map(() => '?').join(',');

    const query = `INSERT INTO requests (${columns.join(',')}) VALUES (${placeholders})`;

    db.run(query, values, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Request created successfully', id });
    });
});

// DELETE a request
app.delete('/api/requests/:id', (req, res) => {
    db.run('DELETE FROM requests WHERE id = ?', [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Request deleted successfully', changes: this.changes });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});

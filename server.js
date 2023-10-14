const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

// Sample data
let sampleData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

app.get('/', (req, res) => {
  res.send('Welcome to your Express.js API!');
});

// GET route to fetch all data
app.get('/api/data', (req, res) => {
  res.json(sampleData);
});

// POST route to add data
app.post('/api/data', (req, res) => {
  const newData = req.body;
  sampleData.push(newData);
  res.json({ message: 'Data added successfully', data: newData });
});

// DELETE route to remove data by ID
app.delete('/api/data/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);
  sampleData = sampleData.filter((item) => item.id !== idToDelete);
  res.json({ message: 'Data deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

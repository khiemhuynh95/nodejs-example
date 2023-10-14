const express = require('express');
const app = express();
const port = 8000;
const { connectToMongoDB } = require('./db'); // Import the database connection module
app.use(express.json());


// Sample data
let sampleData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Connect to MongoDB
let dbClient; // Declare a variable to store the MongoDB client

(async () => {
  try {
    dbClient = await connectToMongoDB();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the application in case of a database connection error
  }

  // Define routes and start your Express.js server
  app.get('/', (req, res) => {
    res.send('Welcome to your Express.js API with MongoDB!');
  });

  // GET route to fetch all data
  app.get('/api/data', (req, res) => {
    res.json(sampleData);
  });

  // POST route to add data
  app.post('/api/add-user', async (req, res) => {
    const userData = req.body;
    const usersCollection = dbClient.db('test-db').collection('users');

    try {
      const result = await usersCollection.insertOne(userData);
      res.status(201).json({ message: 'User added successfully', insertedId: result.insertedId });
    } catch (error) {
      console.error('Error adding user to MongoDB:', error);
      res.status(500).json({ error: 'An error occurred while adding the user' });
    }
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
})();
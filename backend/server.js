// imports and requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Application-level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Index' })
});

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ err })
})


const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
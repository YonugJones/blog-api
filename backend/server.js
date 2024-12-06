// imports and requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const authRouter = require('./routes/auth');

// Application-level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Index' })
});

app.use('/auth', authRouter)


// Global error handler
app.use(errorHandler);



const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

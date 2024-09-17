require('dotenv').config();
const express = require('express');
const connectDB = require('./src/infrastructure/database/mongoConnection');
const routes = require('./src/infrastructure/http/routes');

const app = express();
app.use(express.json());

connectDB();
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

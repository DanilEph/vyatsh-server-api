const express = require('express');
const app = express();
const router = require('./Routers/index');

app.use(express.json());
app.use('/api/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT} port`);
});
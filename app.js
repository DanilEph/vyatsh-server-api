const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const router = require('./Routers/index');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(path.relative(__dirname, 'public/productPhoto')));
app.use(fileUpload({}));
app.use('/api/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT} port`);
});
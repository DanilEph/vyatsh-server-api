const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const router = require('./Routers/index');
const path = require('path');


app.use(express.json());
app.use(express.static(path.relative(__dirname, 'public')));
app.use(fileUpload({}));
app.use('/api/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT} port`);
});
const express = require('express');
const path = require('path');
const routes = require('./server/routes');

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', routes); //routes for getting students and stupids as well as posting and deleting

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

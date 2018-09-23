const express = require('express');
const path = require('path');
const routes = require('./server/routes');
const { syncAndSeed } = require('./server/db');

const app = express();

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', routes); //routes for getting students and stupids as well as posting and deleting

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  res
    .status(err.status || 500)
    .send('<h1>There was an Error. Please Reload.</h1>');
});

const init = () => syncAndSeed();

init();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

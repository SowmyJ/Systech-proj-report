// server.js
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const dataPath = './data/projectData.json';

app.get('/', (req, res) => {
  const projectData = JSON.parse(fs.readFileSync(dataPath));
  res.render('index', { projectData });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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
  res.render('index');
});
app.get('/tab1', (req, res) => {
    const projectData = JSON.parse(fs.readFileSync(dataPath))
    res.render('tab1',{projectData});
  });
  app.get('/tab2', (req, res) => {
    const projectData = JSON.parse(fs.readFileSync(dataPath))
    res.render('tab2',{projectData});
  });
  app.get('/tab3', (req, res) => {
    const projectData = JSON.parse(fs.readFileSync(dataPath))
    res.render('tab3',{projectData});
  });
  app.get('/tab4', (req, res) => {
    const projectData = JSON.parse(fs.readFileSync(dataPath))
    res.render('tab4',{projectData});
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

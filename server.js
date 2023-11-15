// server.js
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require('body-parser');
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


// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/form', (req, res) => {
  res.render('form');
});

// Handle form submission and generate JSON output
app.post('/submit', (req, res) => {
  const formData = {
    field1: req.body.field1,
    field2: req.body.field2,
    field3: req.body.field3,
    field4: req.body.field4,
    field5: req.body.field5,
    field6: req.body.field6,
    field7: req.body.field7,
  };

    // Convert the form data to JSON
    const jsonData = JSON.stringify(formData, null, 2);

    // Render the JSON output
    res.render('json', { jsonData });
    console.log({jsonData});
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

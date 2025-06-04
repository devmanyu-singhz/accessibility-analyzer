const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure path is set correctly

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Home page - form
app.get('/', (req, res) => {
  res.render('index'); // renders views/index.ejs
});

// Handle form submission
app.post('/analyze', (req, res) => {
  const urlInput = req.body.urls;

  if (!urlInput) {
    return res.send('No URLs provided!');
  }

  const urls = urlInput.split(',').map(u => u.trim());

  const results = urls.map(url => ({
    url,
    status: 'Analyzed',
    violations: Math.floor(Math.random() * 10)
  }));
 res.render('results', { results }); // ✅ pass to EJS
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


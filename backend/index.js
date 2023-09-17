const express = require('express');
const app = express();
const port = 3001;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

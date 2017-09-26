const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Add route handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(PORT);

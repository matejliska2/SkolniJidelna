require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require('./routes/api');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Interní chyba serveru' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
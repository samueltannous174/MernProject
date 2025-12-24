
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('./config/db'); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.get('/', (req, res) => res.send('hello'));

app.use('/api/auth', authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));

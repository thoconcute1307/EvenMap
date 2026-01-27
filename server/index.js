const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

<<<<<<< HEAD
const authRoutes = require("./routes/auth");
const adminRoutes = require('./routes/admin');
=======
dotenv.config();
>>>>>>> a9fa25d37059797d341281ad2e4f718ce880bef2

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/scraper', require('./routes/scraper'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/regions', require('./routes/regions'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

<<<<<<< HEAD
// ONLY AUTH
app.use("/api/auth", authRoutes);

//ADMIN
app.use('/api/admin', adminRoutes);

=======
>>>>>>> a9fa25d37059797d341281ad2e4f718ce880bef2
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // const express = require('express');
// // const dotenv = require('dotenv');
// // const cors = require('cors');
// // const connectDB = require('./config/db');

// // dotenv.config();
// // connectDB();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // app.get('/', (req, res) => {
// //   res.send('API is running...');
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });


// const errorHandler = require('./middleware/errorHandler');

// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config(); // Load environment variables

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware to parse JSON
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/cart', require('./routes/cartRoutes'));

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to ShoopyGlobe API');
// });

// // Start server
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to ShoopyGlobe API');
});

// Error handler (should come after all routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

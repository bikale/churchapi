const fs = require('fs');
const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

//load env vars
dotenv.config({ path: './config/config.env' });

//route file
const bible = require('./routes/bibleverse');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent cross sites attacks
app.use(xss());

//Compression the api file
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 100 request per 10 min
  max: 100,
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//Set morgan logger middleware
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

//Mount router

app.use('/api/v1/church', bible);

//404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    data: 'Resource Not Found',
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((dbCon) => {
    console.log(`MongoDB Connected ........`);
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}/api/v1/church`);
    });
  })
  .catch(console.error);

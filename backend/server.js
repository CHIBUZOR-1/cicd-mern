const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require("path");
const crypto = require('crypto');
const { connectDB } = require('./db');
const userRouter = require('./Route/authRoute');
const cloudinary = require('cloudinary').v2;

const app = express();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}));

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json({ urlencoded: false, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

/*app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64'); // Generate nonce
  next();
});
app.use((req, res, next) => {
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", `'nonce-${res.locals.nonce}'`, "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://apis.google.com", "https://www.gstatic.com", "https://www.googleapis.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com", "https://cdn.jsdelivr.net", "https://as2.ftcdn.net", "https://th.bing.com"],
        connectSrc: ["'self'", "https://res.cloudinary.com", "https://identitytoolkit.googleapis.com", "https://www.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'", "blob:", "https://res.cloudinary.com"],
        frameSrc: ["'self'", "https://accounts.google.com"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      }
    }
  })(req, res, next);
});*/

const PORT = process.env.HOSTPORT;

connectDB();

app.use('/api/users', userRouter);
app.get('/', (req, res) => {
    res.send("Welcome to ZONEY");
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
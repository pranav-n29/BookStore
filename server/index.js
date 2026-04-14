const express = require('express');
const path = require('path');
const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const cors=require("cors");
const cookieParser=require("cookie-parser");
const bodyParser = require('body-parser');
const morgan=require("morgan");



//middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mern-book-store-client.vercel.app',
    'https://bookstore.nishantpatil.me/',
    process.env.CLIENT_URL,
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


// app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB connection
const connectionWithDB=require('./connection/DB');
connectionWithDB();

//routes
const bookRoute=require("./routes/bookRoute");
const authRoute = require('./routes/authRoute');
app.use("/api/v1",bookRoute);
app.use('/api/v1/auth', authRoute);

if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.resolve(__dirname, '../client/dist');
  app.use(express.static(clientDistPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

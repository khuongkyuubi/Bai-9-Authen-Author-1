import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import bookRoutes from './src/router/book.router';
import authRoutes from './src/router/auth.router';

const PORT = process.env.PORT || 4000;
const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');

//setup middleware parser body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));
app.use(bodyParser.json());

app.use('/book', bookRoutes);
app.use('/auth', authRoutes);
app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import auth from './routes/auth.js';
import book from './routes/book.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({
  credentials: true,
  origin: origin,
}));

app.use('/auth',auth);
app.use('/book',book);

connectDB();

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

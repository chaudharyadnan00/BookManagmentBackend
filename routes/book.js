import express from 'express';
import { saveNewBook, getAllBooks,updateBook,deleteBook,getBookById,searchByAuthor } from '../controllers/book.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
router.post('/',verifyToken,saveNewBook);
router.get('/getbooks', verifyToken, getAllBooks);
router.put('/:id',verifyToken,updateBook);
router.delete('/:id',verifyToken,deleteBook);
router.get('/:id',verifyToken,getBookById);
router.get('/',verifyToken,searchByAuthor);

export default router;

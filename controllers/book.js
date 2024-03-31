import Book from '../models/Book.js';

// Route for Save a new Book
export const saveNewBook = async (req, res) => {
    try {
        const {
            title, author, publishYear
        } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).json({
                success: false,
                error: {
                    httpErrorCode: 400,
                    message: 'Save New Book : Send all required fields: title, author, publishYear',
                }
            });
        }


        const book = await Book.create({
            title,
            author,
            publishYear
        });

        return res.status(201).json({
            success: true,
            data: {
                book,
                message: 'Save New Book : Book save successfully'
            },
            error: {
                httpErrorCode: 404,
                message: ""
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: {
                httpErrorCode: 500,
                message: err.message
            }
        });
    }
}

// Route for Get All Books from database
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            success: true,
            count: books.length,
            data: {
                books,
                message: 'Get All Books : Books found successfully'
            },
            error: {
                httpErrorCode: 404,
                message: ""
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: {
                httpErrorCode: 500,
                message: err.message
            }
        });
    }
}
// Route for Update a Book
export const updateBook = async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({
                success: false,
                error: {
                    httpErrorCode: 400,
                    message: 'Update Book : Send all required fields: title, author, publishYear',
                }
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: {
                    httpErrorCode: 400,
                    message: 'Update Book : Book not found'
                }
            })
        }

        const book = await Book.findById(id);

        return res.status(200).json({
            success: true,
            data: {
                book,
                message: 'Update Book : Book save successfully'
            },
            error: {
                httpErrorCode: 404,
                message: ""
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: {
                httpErrorCode: 500,
                message: err.message
            }
        });
    }
}

// Route for deleting a book
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: {
                    httpErrorCode: 400,
                    message: 'Delete Book : Book not found'
                }
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                result,
                message: 'Delete Book : Book deleted successfully'
            },
            error: {
                httpErrorCode: 404,
                message: ""
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: {
                httpErrorCode: 500,
                message: err.message
            }
        });
    }
}

// Route for Get Book by id from database
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                error: {
                    httpErrorCode: 400,
                    message: 'Get Book By Id : Book not found'
                }
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                book,
                message: 'Get Book By Id : Book found successfully'
            },
            error: {
                httpErrorCode: 404,
                message: ""
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: {
                httpErrorCode: 500,
                message: err.message
            }
        });
    }
}

//Route for searching book by authorName
export const searchByAuthor = async (req, res) => {
    try {
        const authorName = req.query.author ? { author: { $regex: req.query.author, $options: "i" } } : {};

        if (!authorName) {
            return res.status(400).json({
                success: false,
                error: {
                    httpErrorCode: 400,
                    message: 'Search By Author : Author parameter is missing'
                }
            });
        }

        const books = await Book.find(authorName );


        if (!books || books.length === 0) {
            return res.status(404).json({
                success: false,
                error: {
                    httpErrorCode: 404,
                    message: 'Search By Author : No books found for the provided author'
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                books,
                message: 'Search By Author : Books found successfully'
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: {
                httpErrorCode: 500,
                message: err.message
            }
        });
    }
}

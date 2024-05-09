const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    // Check if 'name' is not provided
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku.',
        });
        response.code(400);
        return response;
    }

    // Check if 'readPage' is greater than 'pageCount'
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount.',
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt
    };

    books.push(newBook);

    // Check if the book is successfully added
    const isSuccess = books.some(book => book.id === id);
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan.',
            data: {
                bookId: id
            },
        });
        response.code(201);
        return response;
    } else {
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan.',
        });
        response.code(500);
        return response;
    }

};

const getAllBooksHandler = (request, h) => {
    const response = h.response({
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);
    return response;

};

const getBookbyIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookbyIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

const deleteBookbyIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

const getBookbyNameHandler = (request, h) => {
    const { name } = request.query;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Mohon masukkan nama buku dalam parameter query.',
        });
        response.code(400);
        return response;
    }

    const filteredBooks = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));

    if (filteredBooks.length > 0) {
        return {
            status: 'success',
            data: {
                books: filteredBooks,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}



module.exports = { addBookHandler, getAllBooksHandler, getBookbyIdHandler, editBookbyIdHandler, deleteBookbyIdHandler, getBookbyNameHandler };
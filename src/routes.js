const { addBookHandler, getAllBooksHandler, getBookbyIdHandler, editBookbyIdHandler, deleteBookbyIdHandler, getBookbyNameHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/id/{id}',
        handler: getBookbyIdHandler,
    },
    {
        method: 'GET',
        path: '/books/name/{name}',
        handler: getBookbyNameHandler,
    },

    {
        method: 'PUT',
        path: '/books/id/{id}',
        handler: editBookbyIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/id/{id}',
        handler: deleteBookbyIdHandler,
    },

];

module.exports = routes;
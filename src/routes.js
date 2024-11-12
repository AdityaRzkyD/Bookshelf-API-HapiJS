const { 
    addBooksHandler, 
    getAllBookHandler, 
    getSpecifiedBookHandler, 
    updateSpecifiedBookHandler,
    deleteSpecifiedBookHandler
} = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getSpecifiedBookHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateSpecifiedBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteSpecifiedBookHandler,
    },
]

module.exports = routes;
const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = ( request, h ) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const finished = ( readPage === pageCount) ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        response.code(400);
        return response;
    }

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id ).length > 0;

    if(isSuccess){
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
}

const getAllBookHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    let book = books;

    if(name !== undefined){
        book = book.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    }

    if(reading !== undefined){
        book = book.filter((b) => b.reading === !!Number(reading));
    }

    if(finished !== undefined){
        book = book.filter((b) => b.finished === !!Number(finished));
    }

    const response = h.response({
        status: 'success',
        data: {
            books: book.map((b) => ({
                id: b.id,
                name: b.name,
                publisher: b.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

const getSpecifiedBookHandler = ( request, h ) => {
    const { id } = request.params;

    const book = books.filter((b) => b.id === id)[0];

    if(book !== undefined){
        return h.response({
            status: 'success',
            data: {
                book,
            },
        }).code(200);
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}

const updateSpecifiedBookHandler = ( request, h ) => {
    const { id } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const finished = ( readPage === pageCount) ? true : false;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id );

    if(index !== -1){
        if (!name){
            const response = h.response({
                status: "fail",
                message: "Gagal memperbarui buku. Mohon isi nama buku",
            })
            response.code(400);
            return response;
        }

        if(readPage > pageCount){
            const response = h.response({
                status: "fail",
                message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
            })
            response.code(400);
            return response;
        }

        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        })
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    response.code(404);
    return response;
}

const deleteSpecifiedBookHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if(index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        })
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    response.code(404);
    return response;
}

module.exports = {
    addBooksHandler,
    getAllBookHandler,
    getSpecifiedBookHandler,
    updateSpecifiedBookHandler,
    deleteSpecifiedBookHandler
}
const Hapi = require('@hapi/hapi');
const route = require('./routes');

const init = async () => {
    const server = Hapi.Server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    })

    server.route(route);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
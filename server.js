import next from 'next';
import { Server as HocuspocusServer } from '@hocuspocus/server';
import { createServer } from 'http';
import { parse } from 'url';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const upgradeHandler = nextApp.getUpgradeHandler();

nextApp.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);

        nextHandler(req, res, parsedUrl);
    });

    const hocuspocusServer = HocuspocusServer.configure({
        port: 3001,
        name: 'hocuspocus-next',

        onRequest: async ({ request, response }) => {
            if (request.headers.accept && request.headers.accept.includes('text/html')) {
                response.writeHead(301, { Location: `http://localhost:${port}${request.url}` });
                response.end();
                return;
            }
            return Promise.reject();
        },

        onUpgrade: async ({ request, socket, head }) => {
            if (request.url.startsWith('/_next/webpack-hmr')) {
                upgradeHandler(request, socket, head);
                throw null;
            }
        },

        onConnect: async () => {
            console.log('🔮 Hocuspocus Client Connected');
        }
    });

    httpServer.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });

    hocuspocusServer.listen(httpServer);
});

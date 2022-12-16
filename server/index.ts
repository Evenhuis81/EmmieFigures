import express from 'express';
import compression from 'compression';
import {renderPage} from 'vite-plugin-ssr';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const root = `${__dirname}/..`;

const app = express();
app.use(compression());

const productionServer = async () => {
    const sirv = (await import('sirv')).default;
    app.use(sirv(`${root}/dist/client`));
};
const developmentServer = async () => {
    const vite = await import('vite');
    const viteDevMiddleware = (
        await vite.createServer({
            root,
            server: {middlewareMode: true},
        })
    ).middlewares;
    app.use(viteDevMiddleware);
};

(async () => {
    isProduction ? await productionServer() : await developmentServer();

    app.get('*', async (req, res, next) => {
        const pageContextInit = {urlOriginal: req.originalUrl};
        const pageContext = await renderPage(pageContextInit);
        const {httpResponse} = pageContext;
        if (!httpResponse) return next();
        const {body, statusCode, contentType, earlyHints} = httpResponse;
        if (res.writeEarlyHints) res.writeEarlyHints({link: earlyHints.map(e => e.earlyHintLink)});
        res.status(statusCode).type(contentType).send(body);
    });

    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
})();

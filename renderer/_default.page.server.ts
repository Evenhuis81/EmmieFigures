import {renderToString} from '@vue/server-renderer';
import {escapeInject, dangerouslySkipEscape} from 'vite-plugin-ssr';
import {createApp} from './app';
import {faviconSVG as favicon} from 'services/logo';
import type {PageContextServer} from 'types/vite-ssr';
import {appDescription, appTitle} from 'services/constants';

export {render};
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname'];

const render = async (pageContext: PageContextServer) => {
    const app = createApp(pageContext);
    const appHtml = await renderToString(app);

    // See https://vite-plugin-ssr.com/head
    const {documentProps} = pageContext.exports;
    const title = (documentProps && documentProps.title) || appTitle;
    const desc = (documentProps && documentProps.description) || appDescription;

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${favicon[1]}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection:
            // https://vite-plugin-ssr.com/page-redirection
        },
    };
};

import {createApp} from './app';
import {getPageTitle} from './getPageTitle';
import type {PageContext} from 'types/vite-ssr';
import type {PageContextBuiltInClient} from 'vite-plugin-ssr/client/router';

export {render};

let app: ReturnType<typeof createApp>;

const render = (pageContext: PageContextBuiltInClient & PageContext) => {
    document.title = getPageTitle(pageContext);
    if (!app) {
        app = createApp(pageContext);
        app.mount('#app');
        return;
    }
    app.changePage(pageContext);
};

export const prefetchStaticAssets = {when: 'VIEWPORT'};

export const clientRouting = true;

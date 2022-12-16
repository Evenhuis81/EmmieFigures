import {createSSRApp, defineComponent, h} from 'vue';
import PageShell from './PageShell.vue';
import {setPageContext} from './usePageContext';
import type {PageContext} from 'types/vite-ssr';

export {createApp};

const createApp = (pageContext: PageContext) => {
    const {Page, pageProps} = pageContext;
    const PageWithLayout = defineComponent({
        render() {
            return h(
                PageShell,
                {},
                {
                    default() {
                        return h(Page, pageProps || {});
                    },
                },
            );
        },
    });

    const app = createSSRApp(PageWithLayout);

    // Make `pageContext` available from any Vue component
    setPageContext(app, pageContext);

    return app;
};

import {createSSRApp, defineComponent, h, markRaw, reactive} from 'vue';
import type {UnwrapNestedRefs} from 'vue';
import PageShell from './PageShell.vue';
import type {ObjectAssign, PageContext} from 'types/vite-ssr';
import {setPageContext} from './usePageContext';

export {createApp};

let app: ReturnType<typeof createSSRApp>;
let rootComponent: ReturnType<typeof defineComponent>;
let pageContextReactive: UnwrapNestedRefs<PageContext>;

const createApp = (pageContext: PageContext) => {
    const PageWithWrapper = defineComponent({
        data: () => ({
            Page: markRaw(pageContext.Page),
            pageProps: markRaw(pageContext.pageProps || {}),
        }),
        created() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            rootComponent = this;
        },
        render() {
            return h(
                PageShell,
                {},
                {
                    default: () => h(this.Page, this.pageProps),
                },
            );
        },
    });

    app = createSSRApp(PageWithWrapper);

    // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
    objectAssign(app, {changePage});

    // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
    // We therefore use a reactive pageContext.
    pageContextReactive = reactive(pageContext);

    // Make `pageContext` accessible from any Vue component
    setPageContext(app, pageContextReactive);

    return app;
};

const changePage = (pageContext: PageContext) => {
    Object.assign(pageContextReactive, pageContext);
    rootComponent.Page = markRaw(pageContext.Page);
    rootComponent.pageProps = markRaw(pageContext.pageProps || {});
};

const objectAssign: typeof ObjectAssign = (obj, objAddendum) => {
    Object.assign(obj, objAddendum);
};

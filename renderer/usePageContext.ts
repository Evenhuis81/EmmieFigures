// `usePageContext` allows us to access `pageContext` in any Vue component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import {inject} from 'vue';
// eslint-disable-next-line no-duplicate-imports
import type {App, InjectionKey} from 'vue';
import {PageContext} from 'types/vite-ssr';

export {usePageContext};
export {setPageContext};

const key: InjectionKey<PageContext> = Symbol();

const usePageContext = () => {
    const pageContext = inject(key);
    if (!pageContext) throw new Error('setPageContext() not called in parent');
    return pageContext;
};

const setPageContext = (app: App, pageContext: PageContext) => {
    app.provide(key, pageContext);
};

import vue from '@vitejs/plugin-vue';
import ssr from 'vite-plugin-ssr/plugin';
import {UserConfig} from 'vite';
import path from 'path';

const aliases = ['components', 'services', 'pages', 'assets', 'types'];

const getAlias = () => {
    const alias: {[key: string]: string} = {};
    aliases.forEach(a => (alias[a] = path.join(path.resolve('.'), a)));
    return {alias};
};

const config: UserConfig = {
    plugins: [vue(), ssr()],
    resolve: getAlias(),
};

export default config;

const { resolve } = require('path');
const buildPath = resolve(__dirname, 'build');

const { build } = require('esbuild');

const basicOptions = {
    bundle: true,
    platform: 'node',
};

build({
    entryPoints: ['./src/server/server.ts'],
    outdir: resolve(buildPath, 'server'),
    ...basicOptions,
}).catch(() => {
    process.exit(1);
});

build({
    entryPoints: ['./src/client/client.ts'],
    outdir: resolve(buildPath, 'client'),
    ...basicOptions,
}).catch(() => {
    process.exit(1);
});

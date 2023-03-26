const { resolve } = require('path');
const buildPath = resolve(__dirname, 'build');

const { context } = require('esbuild');

const basicOptions = {
    // minify: true,
    bundle: true,
    platform: 'node',
    // target: 'es2020',
    // logLevel: 'info',
};

(async () => {
    let ctxS = await context({
        entryPoints: ['./src/server/server.ts'],
        outdir: resolve(buildPath, 'server'),
        ...basicOptions,
    }).catch(() => {
        process.exit(1);
    });

    let ctxC = await context({
        entryPoints: ['./src/client/client.ts'],
        outdir: resolve(buildPath, 'client'),
        ...basicOptions,
    }).catch(() => {
        process.exit(1);
    });

    await ctxC.watch();
    await ctxS.watch();
    console.log('start watching...');
})();

import {Middleware} from 'koa';
import functions from 'firebase-functions';

import app from './app';

export * from './firebase'

const rewrite = (prefix: string): Middleware => {
    return async (ctx, next) => {
        if (ctx.url.startsWith(prefix)) {
            const original = ctx.url;
            ctx.url = ctx.url.replace(prefix, '');

            await next();

            ctx.url = original;
        }

        return next();
    }
}

app.use(rewrite('/api'))

export const api = functions.https.onRequest(app.callback());

import {createCookie} from '@remix-run/node';

export const session = createCookie('session', {
    secrets: ['omeda-session'],
    expires: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000),
    path: '/',
})

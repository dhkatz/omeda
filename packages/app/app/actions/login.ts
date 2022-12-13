import {ActionFunction, redirect} from '@remix-run/node';
import {auth} from '~/session/firebase.server';
import {session} from '~/session/cookies';

export const login: ActionFunction = async ({request}) => {
    const form = await request.formData();
    const idToken = form.get('idToken')?.toString();

    if (!idToken) {
        return {redirect: '/login'}
    }

    await auth.verifyIdToken(idToken);

    const jwt = await auth.createSessionCookie(idToken, {
        expiresIn: 60 * 60 * 24 * 5 * 1000,
    });

    return redirect('/', {
        headers: {
            'Set-Cookie': await session.serialize(jwt)
        }
    })
}

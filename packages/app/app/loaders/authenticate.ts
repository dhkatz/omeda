import {LoaderFunction, redirect} from '@remix-run/node';
import {auth} from '~/session/firebase.server';
import {session} from '~/session/cookies';

export const authenticate: LoaderFunction = async ({request}) => {
    const jwt = await session.parse(request.headers.get('Cookie'));

    if (!jwt) {
        return redirect('/login');
    }

    try {
        const token = await auth.verifySessionCookie(jwt);

        return {
            uid: token.uid,
        }
    } catch (error) {
        return redirect('/logout');
    }
}

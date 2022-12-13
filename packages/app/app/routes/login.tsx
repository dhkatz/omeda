import { signInWithPopup, GithubAuthProvider, UserCredential } from "firebase/auth";
import {useFetcher} from '@remix-run/react';
import {auth} from '~/session/firebase.client';

export default function Login() {
    const fetcher = useFetcher();

    async function login(credential: UserCredential) {
        const token = await credential.user.getIdToken();
        fetcher.submit({ token }, { method: 'post', action: '/login' });
    }

    return (
        <div>
            <button onClick={() => {
                signInWithPopup(auth, new GithubAuthProvider()).then(login).catch(console.error);
            }}>Login with Github</button>
        </div>
    )
}

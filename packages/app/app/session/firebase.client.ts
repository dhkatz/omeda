import { initializeApp } from 'firebase/app';
import { getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth';

const app = initializeApp({

});

const auth = getAuth(app);

setPersistence(auth, inMemoryPersistence);

export { auth };

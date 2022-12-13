import {getFirestore} from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';
import {integrify} from 'integrify';

const db = getFirestore();

integrify({config: {db, functions}});

export const replUserAttrs = integrify({
    rule: 'REPLICATE_ATTRIBUTES',
    source: {
        collection: 'users',
    },
    targets: [
        {
            collection: 'profiles',
            foreignKey: 'userId',
            attributeMapping: {

            }
        }
    ]
});

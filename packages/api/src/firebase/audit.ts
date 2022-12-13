import functions from 'firebase-functions';
import {getFirestore,Timestamp} from 'firebase-admin/firestore';

const db = getFirestore()

export const auditCreate = functions.firestore
    .document('{collection}/{id}')
    .onCreate(async (snapshot, context) => {
        const { collection } = context.params;

        if (collection === 'audits') return;

        const path = snapshot.ref.path;
        const { eventType, eventId } = context;

        const afterData = snapshot.data() ?? null;

        const audit = afterData?.audit ?? {};

        const data = {
            before: null,
            after: afterData,
            metadata: {
                timestamp: snapshot.updateTime ?? convertTimestamp(context.timestamp),
                uid: context.auth?.uid ?? audit.uid ?? 'UNAVAILABLE',
                path,
                event: {
                    type: eventType,
                    id: eventId,
                }
            }
        }

        await db.collection('audits').add(data);
    });

function convertTimestamp(timestamp: string) {
    if (!timestamp || !timestamp.length || timestamp.length !== 27) return Timestamp.now();

    const [date, time] = timestamp.split('T');
    const [year, month, day] = date.split('-');
    const [left, right] = time.split('.');
    const [hour, minute, second] = left.split(':');
    const seconds =
        new Date(
            Date.UTC(
                Number.parseInt(year),
                Number.parseInt(month) - 1,
                Number.parseInt(day),
                Number.parseInt(hour),
                Number.parseInt(minute),
                Number.parseInt(second)
            )
        ).getTime() / 1000;

    const nanos = Number.parseInt(right.substring(0, 6)) * 1000;

    return new Timestamp(seconds, nanos);
}

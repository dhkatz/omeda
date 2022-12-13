import functions from 'firebase-functions';

export const authOnCreate = functions.auth.user().onCreate(async ({ email, uid}) => {

})

export const authOnDelete = functions.auth.user().onDelete(({ uid }) => {

});

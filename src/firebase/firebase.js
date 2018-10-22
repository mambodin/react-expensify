import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_PROJECT_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase , googleAuthProvider,  database as default };

// database.ref('expenses').push({
//     description:'rent',
//     note: 'this is a note',
//     amount: 1222323232,
//     createdAt: 23432
// });
// database.ref('expenses').push({
//     description:'rent2',
//     note: 'this is a note',
//     amount: 123232322,
//     createdAt: 23432
// });
// database.ref('expenses').push({
//     description:'rent3',
//     note: 'this is a note',
//     amount: 1224454222,
//     createdAt: 23432
// });

// const databasePrint = () => {
//     database.ref('expenses')
//         .once('value')
//         .then((snapshot) => {
//             const expenses = [];
//             snapshot.forEach((childsnapshot) => {
//                 expenses.push({
//                     id: childsnapshot.key,
//                     ...childsnapshot.val()
//                 });

//             });
//             console.log(expenses);
//         });
// };

// databasePrint();

// database.ref('expenses').on('child_changed',(snapshot) => {
//     // const expenses = [];
//     //         snapshot.forEach((childsnapshot) => {
//     //             expenses.push({
//     //                 id: childsnapshot.key,
//     //                 ...childsnapshot.val()
//     //             });
//     //         });
//             console.log(snapshot.key, snapshot.val());
// });


// ====================== Firebase Admin SDK configuration =================
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'bird-trading-platform.appspot.com',
});

// ====================== Firebase client configuration =================
const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');

const firebaseConfig = {
    apiKey: 'AIzaSyDoSX0T1MToydOTr706-x61lDrrBlT_QLI',
    authDomain: 'bird-trading-platform.firebaseapp.com',
    projectId: 'bird-trading-platform',
    storageBucket: 'bird-trading-platform.appspot.com',
    messagingSenderId: '155901140768',
    appId: '1:155901140768:web:bc66e4acaf583c429c0145',
    measurementId: 'G-9LX9F36Q13',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = {
    firebaseAdmin: admin,
    firebaseApp: app,
};
